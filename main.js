const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');

const path = require('path');
const fs = require('fs');
const settings = require('./settings.json');

let mainWin, tray, trayWin;

function createMainWindow() {
    mainWin = new BrowserWindow({width: 800, height: 600, fullscreenable: false});
    mainWin.loadURL(`file://${path.join(__dirname,'index.html')}`);

    mainWin.on('closed', () => {
        mainWin = null;
    });
}

function makeTray(){
    tray = new Tray(path.join(__dirname,'images','menuicon2.png'));
    // const contextMenu = Menu.buildFromTemplate([
    //     {label: 'Item1', type: 'radio'},
    //     {label: 'Item2', type: 'radio'},
    //     {label: 'Item3', type: 'radio', checked: true},
    //     {label: 'Item4', type: 'radio'}
    // ]);
    // tray.setToolTip('FTP Client');
    // tray.setContextMenu(contextMenu);
    trayWin = new BrowserWindow({
        width: 350,
        height: 550,
        show: false,
        frame: false,
        resizable: false,
        fullscreenable: false
    });
    trayWin.loadURL(`file://${path.join(__dirname,'trayWindow.html')}`);
    tray.on('right-click', function(event) {
        toggleWindow();
    });
    tray.on('double-click', function(event) {
        toggleWindow();
    });
    tray.on('click', function(event) {
        toggleWindow();
    });
};

function toggleWindow() {
	if (trayWin.isVisible()) {
		trayWin.hide();
	} else {
		showWindow();
	}
}

function showWindow() {
	const trayPos = tray.getBounds();
	const windowPos = trayWin.getBounds();
	let x, y = 0;
	if (process.platform == 'darwin') {
		x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
		y = Math.round(trayPos.y + trayPos.height);
	} else {
		x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
		y = Math.round(trayPos.y + trayPos.height * 10);
	}
	trayWin.setPosition(x, y, false);
	trayWin.show();
	trayWin.focus();
}

//Don't show in the dock
if(settings.hide_dock_icon){
    app.dock.hide();
}

app.on('ready', makeTray);

//For now, keeping app active after all windows are closed because of trays
// app.on('window-all-closed', function(){
//     if(process.platform !== 'darwin'){
//         app.quit();
//     }
// });

// app.on('activate', function(){
//     if(mainWin == null){
//         createMainWindow();
//     }
// });
