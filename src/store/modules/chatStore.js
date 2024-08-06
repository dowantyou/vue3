import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    queue: [], // 字符队列
    consuming: false, // 是否正在消费
    timer: null, // 定时器引用
  }),

  actions: {
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
  },
})

export default useChatStore