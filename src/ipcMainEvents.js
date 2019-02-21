import { ipcMain, dialog } from 'electron'
import settings from 'electron-settings'

function setMainIpc (win) {
  let defaultPath = ''
  if (settings.has('dwnler-directory')) {
    defaultPath = settings.get('dwnler-directory')
  }
  ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
      title: 'Open folder to save song',
      buttonLabel: 'Save',
      defaultPath: defaultPath,
      properties: ['openDirectory']
    }, (dir) => {
      if (dir) {
        settings.set('dwnler-directory', dir[0])
        event.sender.send('open-directory-to-save', dir[0])
      }
    })
  })

  // Show dialog to the user.
  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message,
      buttons: ['Ok']
    })
  })
}

module.exports = setMainIpc
