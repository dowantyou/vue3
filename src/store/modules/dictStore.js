// src/store/modules/dictStore.js
import { defineStore } from 'pinia';
import { sessionStorage } from '@/utils/storage.js';
import { getLWDict } from '@/api/lw_dict.js';

export const useDictStore = defineStore('dict', {
  state: () => ({
    dictData: null, // 存储获取到的词典数据
  }),
  
  actions: {
    // 根据单词获取并存储词条数据
    async getAndStoreDictData(word) {
      const response = await getLWDict(word);
      if (response && response.lemma) {
        this.dictData[word] = response;
        sessionStorage.set(word, response); // 使用单词作为键存储到sessionStorage
      } else {
        console.error('未找到词条数据');
      }
    },

    // 从sessionStorage获取存储的词条数据
    getStoredDictData(word) {
      return sessionStorage.get(word);
    },

    // 清除特定单词的词条数据
    clearDictData(word) {
      delete this.dictData[word];
      sessionStorage.remove(word);
    },

    // 清除所有存储的词条数据
    clearAllDictData() {
      this.dictData = {};
      // 清除sessionStorage中的所有词条数据
      Object.keys(this.dictData).forEach(word => {
        sessionStorage.remove(word);
      });
    }
  }
});

export default useDictStore;