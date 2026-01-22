const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const browserWindows = new Map();
let mainWindow = null;

const createBrowserWindow = () => {
  const child = new BrowserWindow({
    width: 1100,
    height: 760,
    autoHideMenuBar: true,
  });
  child.loadURL("https://www.baidu.com/");
  return child;
};

const sendWindowCount = (id) => {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }
  const count = (browserWindows.get(id) || []).length;
  mainWindow.webContents.send("browser:count", { id, count });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: "#e9f2ff",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist/renderer/index.html"));
  }
};

ipcMain.handle("browser:start", (_event, { id }) => {
  const existing = browserWindows.get(id) || [];
  existing.forEach((win) => {
    if (!win.isDestroyed()) {
      win.close();
    }
  });

  const windows = [];
  for (let i = 0; i < 2; i += 1) {
    const win = createBrowserWindow();
    windows.push(win);
  }
  browserWindows.set(id, windows);
  sendWindowCount(id);
  windows.forEach((win) => {
    win.on("closed", () => {
      const current = browserWindows.get(id) || [];
      const next = current.filter((item) => item !== win);
      if (next.length === 0) {
        browserWindows.delete(id);
      } else {
        browserWindows.set(id, next);
      }
      sendWindowCount(id);
    });
  });
  return { opened: windows.length };
});

ipcMain.handle("browser:stop", (_event, { id }) => {
  const windows = browserWindows.get(id) || [];
  windows.forEach((win) => {
    if (!win.isDestroyed()) {
      win.close();
    }
  });
  browserWindows.delete(id);
  sendWindowCount(id);
  return { closed: windows.length };
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
