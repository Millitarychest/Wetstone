// main.js




// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const DB = require('./functions/sql.js');
const { resolve } = require('path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1400,
    height: 765,
    minHeight: 765,
    minWidth: 1400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.show()
  //ipcHandlers
  ipcMain.handle('ping', () => 'pong')
  //load Project data from DB
  ipcMain.handle('fetchAllP', () => {return DB.fetchProjects()})
  ipcMain.handle('fetchDoneP', () => {return DB.fetchCompProjects()})
  ipcMain.handle('fetchUndoneP', () => {return DB.fetchIdeas()})
  ipcMain.handle('fetchPreview', () => {return DB.fetchPreview()})
  ipcMain.handle('fetchAllE', () => {return DB.fetchEnv()})
  ipcMain.handle('insertProject', (event,name, desc, env, location, url, status) => {return DB.insertProject(name, desc, env, location, url, status)})
  ipcMain.handle('insertEnv', (event,name, com) => {return DB.insertEnv(name, com)})
  ipcMain.handle('fetchByName', (event,name) => {return DB.fetchByName(name)})
  ipcMain.handle('openUrl', (event,url) => {shell.openExternal(url)})
  ipcMain.handle('updateProject', (event,name, desc, envID, location, url, status, pnr) => {return DB.updateProject(name, desc, envID, location, url, status, pnr)})
  ipcMain.handle('fetchNotes', () => {return DB.fetchNotes()})
  ipcMain.handle('addNote', (event, title, content) => {return DB.insertNote(title, content)})
  ipcMain.handle('editNote', (event, title, content, id) => {return DB.updateNote(title, content, id)})
  ipcMain.handle('deleteProject', (event, id) => {return DB.deleteProject(id)})
  

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  

}
//functions





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.