// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    ipcRenderer.send('reloaded-window');
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        ipcRenderer.send('minimize-window');
    });

    document.getElementById('max-button').addEventListener("click", event => {
        ipcRenderer.send('maximize-window');
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        ipcRenderer.send('unmaximize-window');
    });

    document.getElementById('close-button').addEventListener("click", event => {
        ipcRenderer.send('close-window');
    });
}

ipcRenderer.on('is-maximized-window', (event, data) => {
    console.log('is-maximized-window with data: '+data)
    if (data) {
        document.body.classList.add('maximized');
    } else {
        document.body.classList.remove('maximized');
    }
})