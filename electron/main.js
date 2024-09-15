// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      devTools: true
    }
  });

  mainWindow.loadURL('http://localhost:4200');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('read-file', async (event, filePath) => {
    try {
      return await fs.promises.readFile(filePath, 'utf-8');
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle('write-file', async (event, filePath, content) => {
    try {
      await fs.promises.writeFile(filePath, content, 'utf-8');
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle('delete-file', async (event, filePath) => {
    try {
      await fs.promises.unlink(filePath);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
