import { ipcRenderer } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs.extra'
import ytdl from 'ytdl-core'
import path from 'path'
import sanitize from 'sanitize-filename'

function convertMp4toMp3 (folderPath, fileName, tmpFilePath) {
  // Convert the temp mp4 file to mp3
  ffmpeg(tmpFilePath)
    .format('mp3')
    .output(fs.createWriteStream(path.join(folderPath, `${fileName}.mp3`)))
    .on('end', () => {
      fs.unlinkSync(tmpFilePath)
    })
    .run()
}

function downloadYoutubeVideo (dir) {
  // Download the Youtube Video.
  const url = document.getElementById('url').value
  let inputUrl = document.getElementById('input-url')
  let divBar = document.getElementById('div-bar')
  if (!ytdl.validateURL(url)) throw new Error('URL error')
  inputUrl.classList.add('hidden')
  divBar.classList.remove('hidden')
  let videoId = ytdl.getURLVideoID(url)
  ytdl.getInfo(videoId, (err, info) => {
    if (err) throw err
    let video = ytdl(url, { filter: 'audioonly' })
    video.on('progress', (chunkLength, downloaded, total) => {
      let newVal = Math.floor((downloaded / total) * 100)
      let bar = document.getElementById('progress-bar')
      let progressNumber = document.getElementById('progress-number')
      bar.style.width = `${newVal}%`
      progressNumber.innerHTML = `${newVal}%`
    })
    const tmpFileName = `tmp_${info.title}.mp4`
    const tmpFilePath = path.join(dir, tmpFileName)
    video.pipe(fs.createWriteStream(tmpFilePath)).on('finish', () => {
      convertMp4toMp3(dir, sanitize(info.title), tmpFilePath)
      inputUrl.classList.remove('hidden')
      divBar.classList.add('hidden')
      ipcRenderer.send(
        'show-dialog',
        { type: 'info', title: 'Dwnler', message: 'The file is done!' })
    })
  })
}

module.exports = {
  downloadYoutubeVideo: downloadYoutubeVideo
}
