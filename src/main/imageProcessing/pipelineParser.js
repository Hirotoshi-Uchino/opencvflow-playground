import cv from 'opencv4nodejs'
import path from 'path'
import {GrayScale} from "./process"


export default class{

  processMap = {
    1: GrayScale
  }

  constructor(pipelineInfo){
    this.pipelineInfo = pipelineInfo
    this.imageFilePath = pipelineInfo['imageFilePath']
  }

  get getImage(){
    return cv.imread(this.imageFilePath)
  }

  parse(){
    let ext = path.extname(this.imageFilePath)

    let processInstances = []

    for(let i in this.pipelineInfo['pipeline']){
      let process = this.pipelineInfo['pipeline'][i]
      let processId  = process['processId']
      let blockId    = process['blockId']
      let parameters = process['parameters']

      let detailProcess = ''
      if('detailProcess' in parameters){
        detailProcess = parameters['detailProcess']
      }

      let detailParameters = {}
      if('detailParameters' in parameters){
        detailParameters = parameters['detailParameters']
      }

      let processInstance = new this.processMap[processId](ext, detailProcess, detailParameters)
      processInstances.push({blockId: blockId, process: processInstance})

    }

    return processInstances
  }

}
