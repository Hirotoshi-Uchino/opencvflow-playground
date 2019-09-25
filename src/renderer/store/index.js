import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)



export default new Vuex.Store({
// export const store = new Vuex.Store({
  state: {
    // blocks: {},
    blocks: [],
    nextBlockId: 1
  },

  mutations: {
    addBlock(state, block){
      state.blocks.push(block)
      // state.blocks[state.nextBlockId] = block // Hash に追加の場合は算術プロパティが発火しない
      ++state.nextBlockId
    },

    removeBlock(state, blockId){
      let numBlockId = Number(blockId)
      let index = state.blocks.findIndex(block => block.blockId === numBlockId)
      // 削除
      console.log('blockId = ', blockId)
      console.log('削除される要素のindex = ', index)
      console.log(state.blocks[index])
      if(index >= 0) {
        state.blocks.splice(index, 1)
      }
      // let newBlocks = state.blocks.filter(block => block.blockId !== blockId);
      // console.log(newBlocks)
      // state.blocks = newBlocks
    }
    // incrementNextBlockId(state){
    //   ++state.nextBlockId
    // }
  },

  getters: {
    getNextBlockId(state) {
      return state.nextBlockId
    }
  },

  // modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
