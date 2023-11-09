import axios from 'axios'
import { fs } from 'fs'
//你可以使用axios来下载文件，然后将其保存成一个本地文件。以下是一个基于axios的JavaScript函数示例，该函数接受一个URL和一个文件名作为参数，并将网络地址对应的文件保存到本地：
async function downloadFile(url, fileName) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    })

    const writer = fs.createWriteStream(fileName)

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  } catch (error) {
    throw new Error(`Error downloading file: ${error}`)
  }
}
//要将网络图片地址转为File对象，你可以使用axios来下载图片，然后将其转换成File对象。以下是一个基于axios的JavaScript函数示例，该函数接受一个图片URL，并返回一个Promise，该Promise在图片下载完成后解析为一个File对象：
async function urlToBlob(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })
    const fileName = url.substring(url.lastIndexOf('/') + 1)

    return new File([blob], fileName, {
      type: response.headers['content-type']
    })
  } catch (error) {
    throw new Error(`Error converting URL to File: ${error}`)
  }
}
export { downloadFile, urlToBlob }
