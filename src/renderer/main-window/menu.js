import { remote } from 'electron'

function createMenu () {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          role: 'quit'
        }
      ]
    }
  ]
  const menu = remote.Menu.buildFromTemplate(template)
  remote.Menu.setApplicationMenu(menu)
}

module.exports = createMenu
