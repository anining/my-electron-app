const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("browserApi", {
  start: (id) => ipcRenderer.invoke("browser:start", { id }),
  stop: (id) => ipcRenderer.invoke("browser:stop", { id }),
  onCount: (handler) => {
    const listener = (_event, payload) => handler(payload);
    ipcRenderer.on("browser:count", listener);
    return () => ipcRenderer.removeListener("browser:count", listener);
  },
});
