import axios from 'axios'
//将网络图片地址转为file对象
async function urlToBlob(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    const contentType = response.headers['content-type']
    const blob = new Blob([response.data], { type: contentType })
    const fileName = url.substring(url.lastIndexOf('/') + 1)

    return new File([blob], fileName, { type: contentType })
  } catch (error) {
    throw new Error(`Error converting URL to File: ${error}`)
  }
}

export default urlToBlob
