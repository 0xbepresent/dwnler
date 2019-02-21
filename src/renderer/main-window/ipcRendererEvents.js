import { ipcRenderer } from 'electron'
import { downloadYoutubeVideo } from './youtube'

function setIpc () {
  ipcRenderer.on('open-directory-to-save', (event, dir) => {
    downloadYoutubeVideo(dir)
  })
}

function saveFile () {
  ipcRenderer.send('open-directory')
}

module.exports = {
  setIpc: setIpc,
  saveFile: saveFile
}
