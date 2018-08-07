const electron = require('electron');
const url = require('url');
const path = require('path');

const { app,BrowserWindow,Menu,ipcMain } = electron;

let mainwindow;
let addWindow;

//listen for app to be ready
app.on('ready',function(){
    // Create new window
    mainwindow = new BrowserWindow({});
    //Load Html file into windows
    mainwindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainwindow.html'),
        protocol:'file',
        slashes: true
    }));

    //Quit App when closed
    mainwindow.on('closed',function(){
        app.quit();
    })
      
     // Build menu from Template
    const mainmenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainmenu);
    
});



function createWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List'
    });
    //Load Html file into windows
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addwindow.html'),
        protocol:'file',
        slashes: true
    }));
    // addWindow.setMenu(null);
    //Gabbage collection
    addWindow.on('close',function(){
        addWindow = null;
    })
}

//Catch item from addWindow.html
ipcMain.on('item:add',function(e,item){
  mainwindow.webContents.send('item:add',item);
  addWindow.close();
})

// Create a menu template
const mainMenuTemplate = [
   {
       label: 'File',
       submenu: [
           {
               label: 'Add Item',
               click(){
                   createWindow();
               }
               
           },
           {
               label: 'Clear Item'
           },
           {
               label: 'Quit',
               accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
               click(){
                   app.quit();
               }
           }
       ]
   }
];

// Check if running on Mac,then add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer Tools Item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();

                }
            },
            {
                role: 'reload'
            },
            {
               role: 'quit'  
            }
        ]
    })
}