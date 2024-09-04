// src\store\modules\chatStore.js
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    queue: [], // 字符队列
    consuming: false, // 是否正在消费
    timer: null, // 定时器引用
    currentModel: 'gpt-3.5-turbo', // 默认模型
    recordList: {}, // 存储所有会话记录
    currentKey: '', // 当前会话的键
  }),

  actions: {
    // 增加历史会话
    addRecord (key, messages) {
      this.recordList[key] = messages
      this.saveHistory()
    },


    setCurrentKey (key) {
      this.currentKey = key
      this.saveHistory()
    },

    getCurrentRecords () {
      return this.recordList[this.currentKey] || []
    },

    saveHistory () {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
      window.localStorage.setItem('currentKey', this.currentKey)
    },

    loadHistory () {
      const recordList = JSON.parse(window.localStorage.getItem('recordList')) || {}
      const currentKey = window.localStorage.getItem('currentKey') || ''
      this.recordList = recordList
      this.currentKey = currentKey
    },
    // 模型选择
    changeModel (newModel) {
      this.currentModel = newModel
    },
    setOnConsume (onConsume) {
      this.onConsume = onConsume
    },
    dynamicSpeed () {
      // 动态计算输出速度
      const speed = 2000 / this.queue.length
      return Math.min(200, speed)
    },

    add (str) {
      // 将字符串拆分为字符并添加到队列
      if (str) {
        this.queue.push(...str.split(''))
      }
    },

    consume () {
      // 消费队列中的一个字符
      if (this.queue.length > 0) {
        const str = this.queue.shift()
        this.onConsume && this.onConsume(str) // 确保 onConsume 已定义
      }
    },

    next () {
      // 消费下一个字符并设置定时器
      this.consume()
      this.timer = setTimeout(() => {
        this.consume()
        if (this.consuming) {
          this.next()
        }
      }, this.dynamicSpeed())
    },

    start () {
      // 开始消费队列
      this.consuming = true
      this.next()
    },

    done () {
      // 结束消费队列
      this.consuming = false
      clearTimeout(this.timer)
      // 立即消费剩余的字符
      this.onConsume && this.onConsume(this.queue.join(''))
      this.queue = []
    },
    generateKey () {
      return `${new Date().toLocaleString().split(' ')[0]}_${String(Math.random()).slice(2, 6)}`
    },

    // 删除指定键位置
    deleteRecord (key) {
      if (key in this.recordList) {
        delete this.recordList[key]
        this.saveHistory()
      }
    }
  },
})

export default useChatStore
