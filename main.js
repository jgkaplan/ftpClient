const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

const path = require('path');
const fs = require('fs');
const url = require('url');

let win, tray;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

// app.on('ready', createWindow);
app.on('ready', function(){
    tray = new Tray(path.join(__dirname,'images','menuicon'));
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Item1', type: 'radio'},
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'}
    ]);
    tray.setToolTip('FTP Client');
    tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function(){
    if(win == null){
        createWindow();
    }
});
