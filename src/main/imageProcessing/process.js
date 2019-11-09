import cv from 'opencv4nodejs'

class ProcessBase {
  constructor(ext) {
    this.ext = ext
  }

  imgToBase64(img){
    return cv.imencode(this.ext, img).toString('base64')
  }

}

export class GrayScale extends ProcessBase{
// class GrayScale2 extends ProcessBase{
  constructor(ext, detail_process, detail_parameters){
    super(ext)
  }

  do(img){
    let gray = img.bgrToGray()
    let grayBase64 = super.imgToBase64(gray)
    return [gray, grayBase64]
  }

}

export class Binarization extends ProcessBase{
  cvProcesses = {
    'Binary': cv.THRESH_BINARY,
  }


}
