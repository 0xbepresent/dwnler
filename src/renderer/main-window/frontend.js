import createMenu from './main-window/menu'
import { setIpc, saveFile } from './main-window/ipcRendererEvents'

window.addEventListener('load', () => {
  createMenu()
  setIpc()
  changeUrlInput()
  buttonEvent('dwn-btn', saveFile)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}

function changeUrlInput () {
  const inputUrl = document.getElementById('url')
  const defaultVideo = 'https://www.youtube.com/watch?v=djV11Xbc914'
  inputUrl.value = defaultVideo
  inputUrl.addEventListener('click', function () {
    inputUrl.value = ''
  })
}
