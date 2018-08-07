const electron = require('electron');
const url = require('url');
const path = require('path');

const { app,BrowserWindow,Menu } = electron;

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
}

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
               click(){
                   app.quit();
               }
           }
       ]
   }
];