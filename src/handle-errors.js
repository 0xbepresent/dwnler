import { dialog } from 'electron'

function relaunchApp (win) {
  dialog.showMessageBox(win, {
    type: 'error',
    title: 'Dwnler',
    message: 'An error occurred while starting the application.',
    buttons: ['Ok']
  }, () => {

  })
}

function setupErrors (win) {
  win.webContents.on('crashed', () => {
    relaunchApp(win)
  })

  win.on('unresponsive', () => {
    dialog.showMessageBox(win, {
      type: 'warning',
      title: 'Dwnler',
      message: 'Process is taking too long, you can wait or restart manually.'
    })
  })

  process.on('uncaughtException', () => {
    relaunchApp(win)
  })
}

module.exports = setupErrors
