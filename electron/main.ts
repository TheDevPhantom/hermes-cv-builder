import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { generatePDF } from './pdfGenerator';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'hermes-icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: true
    },
    titleBarStyle: 'hidden',
    transparent: true,
    trafficLightPosition: {
      x: 12,
      y: 16
    },
    vibrancy: 'under-window',
    width: 1200,
    height: 800
  });

  win.webContents.session.setSpellCheckerLanguages(['en-UK', 'fr']);

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

ipcMain.on('generate-pdf', (event, data) => {
  const outputPath = 'output.pdf'; // Specify the desired output path
  generatePDF(data, outputPath);
});

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(createWindow);
