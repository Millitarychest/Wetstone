// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')


if(location.pathname.endsWith('/index.html')) {
  contextBridge.exposeInMainWorld('bridge', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    //ping: () => ipcRenderer.invoke('ping'),
    fetchPreview: () => ipcRenderer.invoke('fetchPreview'),
    // we can also expose variables, not just functions
  })
}
else if(location.pathname.endsWith('/project.html')){
  contextBridge.exposeInMainWorld('bridge', {
    fetchAll: () => ipcRenderer.invoke('fetchAllP'),
    fetchDone: () => ipcRenderer.invoke('fetchDoneP'),
    fetchUndone: () => ipcRenderer.invoke('fetchUndoneP'),
  })
}