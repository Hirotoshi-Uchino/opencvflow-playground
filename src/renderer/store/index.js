import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

let blocks = [
  {
    blockId: 1,
    processId: 0,
    iconLabel: 'In',
    execButton: false,
    x: 20,
    y: 30,
    linksToNextBlock: [],
    parameters: {
      imageFileName: '',
      imageFilePath: '',
      imageData: '',
    }
  },
  {
    blockId: 2,
    processId: 1,
    iconLabel: 'GS',
    execButton: false,
    x: 120,
    y: 30,
    linksToNextBlock: [],
    parameters: {}
    // linkToPreviousBlock: {} // Link 作成時にこの要素が追加される。 (Input Block以外)
  },
  {
    blockId: 3,
    iconLabel: 'GF',
    processId: 3,
    execButton: false,
    x: 220,
    y: 30,
    linksToNextBlock: [],
    parameters: {}
  },
  {
    blockId: 4,
    iconLabel: 'Po',
    processId: 4,
    execButton: false,
    x: 320,
    y: 30,
    linksToNextBlock: [],
    parameters: {}
  },
]


// ===============
// pipelines の仕様↓ ※ pipelineId は、pipelineの終点のblockIdと一致させる
// [
//   {
//     pipelineId: lastBlockId,
//     pipeline:[
//       {
//         processId: processId
//         parameters: {}
//       },
//       {
//         processId: processId
//         parameters: {}
//       },
//      ︙
//      ],
//      imgFile: {} // BASE64? // URLでもよいか
//  pipelineId: [...]
//  ︙
// ]
// ===============

function isInputBlock(block){
  return block.processId === 0
}

export default new Vuex.Store({
// export const store = new Vuex.Store({
  state: {
    // blocks: {},
    blocks: blocks,
    pipelines: [],
    links: [],
    nextBlockId: 5,
    nextLinkId: 1
  },

  mutations: {
    addBlock(state, block){
      state.blocks.push(block)
      // state.blocks[state.nextBlockId] = block // Hash に追加の場合は算術プロパティが発火しない this.$set?
      ++state.nextBlockId
    },

    removeBlock(state, blockId){
      let index = state.blocks.findIndex(block => block.blockId === blockId)
      if(index >= 0) {
        state.blocks.splice(index, 1)
      }
    },

    updateBlockPosition(state, blockInfo){
      let selectedBlock = state.blocks.find(block => block.blockId === blockInfo.blockId)
      selectedBlock.x = blockInfo.x;
      selectedBlock.y = blockInfo.y;
    },

    incrementNextLinkId(state){
      ++state.nextLinkId
    },


    updateLinksToNextBlock(state, info) {
      let selectedBlock = state.blocks.find(block => block.blockId === info.blockId)
      selectedBlock.linksToNextBlock.push({id: info.linkId, pathEdge: info.pathEdge})
    },

    updateLinkToPreviousBlock(state, info) {
      let selectedBlock = state.blocks.find(block => block.blockId === info.blockId)
      selectedBlock.linkToPreviousBlock = {id: info.linkId, pathEdge: info.pathEdge}
    },

    removeLinkToPreviousBlock(state, blockId) {
      let selectedBlock = state.blocks.find(block => block.blockId === blockId)
      delete selectedBlock.linkToPreviousBlock
    },

    removeOneLinkFromLinksToNextBlock(state, info) {
      let selectedBlock = state.blocks.find(block => block.blockId === info.blockId)
      let index = selectedBlock.linksToNextBlock.findIndex(link => link.id === info.linkId)
      if(index >= 0) {
        selectedBlock.linksToNextBlock.splice(index, 1)
      }
    },

    inputParameters(state, info){
      let selectedBlock = state.blocks.find(block => block.blockId === info.blockId)
      for(let i in info.parameters){
        selectedBlock.parameters[i] = info.parameters[i]
      }
      // 下の方式では、参照が途切れてpipelinesに自動反映されない
      // selectedBlock.parameters = info.parameters
      // TODO: Fileの場合とそれ以外で切り替え
    },

    reconstructPipelines(state, links) {
      // pipeline初期化
      state.pipelines = []
      for(let i in state.blocks) {
        let block = state.blocks[i]
        block.execButton =false;

        if (isInputBlock(block)) continue

        // pipelineの器作成
        let pipelineInfo = {pipelineId: block.blockId, pipeline: [], imgFile: null}

        let process = {
          blockId: block.blockId,
          processId: block.processId,
          parameters: block.parameters
        }
        pipelineInfo.pipeline.push(process)

        let pipelineComplete = false
        // 1つのBlockIdからpreviousBlockにたどっていく
        while (block.linkToPreviousBlock) {
          let linkId          = block.linkToPreviousBlock.id
          let selectedLink    = links.find(link => link.id === linkId)
          let previousBlockId = selectedLink.rightBarPoint.blockId

          block = state.blocks.find(block => block.blockId === previousBlockId)

          let process = {
            blockId: block.blockId,
            processId: block.processId,
            parameters: block.parameters
          }

          pipelineInfo.pipeline.push(process)
          // たどっていった先にInputがあればpipeline完成
          pipelineComplete = isInputBlock(block)
        }

        if(pipelineComplete){
          pipelineInfo.pipeline = pipelineInfo.pipeline.reverse() // 逆から順にpipelineを作成したので通常の順に戻す
          state.pipelines.push(pipelineInfo)
          state.blocks[i].execButton = true
        }

      }
    },


  },

  getters: {
    getNextBlockId(state) {
      return state.nextBlockId
    },

    getNextLinkId(state){
      return state.nextLinkId
    },

    getBlock: function(state) {
      return function(blockId) {
        return state.blocks.find(block => block.blockId === blockId)
      }
    },

    getPipeline: function(state) {
      return function(pipelineId){
        return state.pipelines.find(pipeline => pipeline.pipelineId === pipelineId)
      }
    }
  },

  // modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
