'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'
import setIpcMain from './ipcMainEvents'
import handleErrors from './handle-errors'

if (process.env.NODE_ENV === 'dev') {
  devtools()
}

global.win // eslint-disable-line

app.on('ready', () => {
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Dwnler',
    center: true,
    maximizable: false
  })

  setIpcMain(global.win)
  handleErrors(global.win)

  global.win.once('ready-to-show', () => {
    global.win.show()
  })

  global.win.on('closed', () => {
    global.win = null
    app.quit()
  })

  global.win.loadURL(`file://${__dirname}/renderer/index.html`)
})
