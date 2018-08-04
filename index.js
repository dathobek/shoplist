const electron = require('');
const url = require('url');
const path = require('path');

const { app,BrowserWindow } = electron;

let mainwindow;

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
});