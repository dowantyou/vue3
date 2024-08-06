import { ref } from 'vue'
import { StreamGpt } from '@/api/chatfetch/stream.js'
import { useChatStore } from '@/store/modules/chatStore.js'

export function useGpt (history = false) {
  const streamingText = ref('')
  const streaming = ref(false)
  const msgList = ref([])

  // 创建状态管理实例
  const store = useChatStore()

  // 设置 onConsume 回调
  store.setOnConsume((str) => {
    streamingText.value += str || ''
    console.log('str', str)
  })


  // 由于 StreamGpt 现在是一个函数，我们需要调整 stream 方法来调用它
  const stream = async function (prompt) {
    try {
      await StreamGpt({
        onStart: prompt => {
          streaming.value = true
          msgList.value.push({
            role: 'user',
            content: prompt
          })
        },
        onPatch: text => {
          console.log('onPatch', text)
          store.add(text)
        },
        onCreated: () => {
          store.start()
        },
        onDone: () => {
          store.done()
          streaming.value = false
          msgList.value.push({
            role: 'system',
            content: streamingText.value
          })
          streamingText.value = ''
        }
      }, prompt, history ? msgList.value : [])
    } catch (error) {
      console.error('Error during stream:', error)
    }
  }


  return {
    streamingText,
    streaming,
    msgList,
    stream
  }
}