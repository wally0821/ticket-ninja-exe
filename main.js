
const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 載入 Next.js 網站
  win.loadURL('http://localhost:3000');
}

// 啟動 Next.js 本地伺服器
const startNext = exec('npm run start', { cwd: path.join(__dirname, 'app') });
startNext.stdout.on('data', data => console.log('[Next.js]', data));
startNext.stderr.on('data', data => console.error('[Next.js ERROR]', data));

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
