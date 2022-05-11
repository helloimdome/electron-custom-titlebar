// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron');
const path = require('path');

//Disable menu bar
Menu.setApplicationMenu(false);

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#FFF',
        frame: false,
        webPreferences: {
            contextIsolation: false, // protect against prototype pollution
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        }
    });

    globalShortcut.register('CommandOrControl+R', function() {
		console.log('Reloading main window...');
		mainWindow.reload();
	});

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(() => {
    const mainWindow = createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcMain.on('minimize-window',()=>{
        //if mainWindow is the window object
        mainWindow.minimize();
    });
    ipcMain.on('maximize-window',(event, args)=>{
        //if mainWindow is the window object
        mainWindow.maximize();
        event.reply('is-maximized-window', true);
    });
    ipcMain.on('unmaximize-window',(event, args)=>{
        //if mainWindow is the window object
        mainWindow.unmaximize();
        event.reply('is-maximized-window', false);
    });
    ipcMain.on('close-window',()=>{
        //if mainWindow is the window object
        mainWindow.close();
    });
    ipcMain.on('reloaded-window', () => {
        mainWindow.removeAllListeners();
    })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.