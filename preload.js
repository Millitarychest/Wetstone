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
else if(location.pathname.endsWith('/NewEntry.html')){
  contextBridge.exposeInMainWorld('bridge', {
    fetchE: () => ipcRenderer.invoke('fetchAllE'),
    insertP: (name, desc, env, location, url, status) => ipcRenderer.invoke('insertProject', name, desc, env, location, url, status),
  })
}
else if(location.pathname.endsWith('/NewEnv.html')){
  contextBridge.exposeInMainWorld('bridge', {
    insertE: (name, com) => ipcRenderer.invoke('insertEnv', name, com),
  })
}
else if(location.pathname.endsWith('/projectDetails.html')){
  contextBridge.exposeInMainWorld('bridge', {
    fetchByName: (name) => ipcRenderer.invoke('fetchByName', name),
    openUrl: (url) => ipcRenderer.invoke('openUrl', url),
    fetchE: () => ipcRenderer.invoke('fetchAllE'),
    updateProject: (name, desc, envID, location, url, status, pnr) => ipcRenderer.invoke('updateProject', name, desc, envID, location, url, status, pnr),
  })
}