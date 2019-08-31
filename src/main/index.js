import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const mainURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const subpy = require('child_process').spawn('./venv/bin/python', ['./backend/api.py']);
  const rq = require('request-promise');

  const openWindow = function () {
    mainWindow = new BrowserWindow({
      webPreferences: {
        webSecurity: false,
      },
      height: 563,
      useContentSize: true,
      width: 1000,
    });

    mainWindow.loadURL(mainURL);

    mainWindow.on('closed', () => {
      mainWindow = null;
      subpy.kill('SIGINT');
    });
  };

  const startUp = function () {
    rq(mainURL)
      .then((htmlString) => {
        console.log(htmlString);
        console.log('server started');
        openWindow();
      })
      .catch((err) => {
        console.log(err);
        startUp();
      });
  };

  startUp();
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
