// src\hooks\index.js
import { ref } from 'vue'
import { StreamGpt } from '@/api/chatfetch/stream.js'
import { useChatStore } from '@/store/modules/chatStore.js'
export function useGpt (history = false) {
  const streamingText = ref('')
  const streaming = ref(false)
  const msgList = ref([])
  const store = useChatStore()

  store.setOnConsume((str) => {
    streamingText.value += str || ''
  })

  const currentKey = ref(store.currentKey)
  const recordList = ref(store.recordList)

  const saveHistory = () => {
    store.saveHistory()
  }

  const stream = async function (prompt, model) {
    try {
      await StreamGpt({
        onStart: (prompt) => {
          streaming.value = true
          msgList.value.push({ role: 'user', content: prompt })
        },
        onPatch: (text) => {
          store.add(text)
        },
        onCreated: () => {
          store.start()
        },
        onDone: () => {
          store.done()
          streaming.value = false
          msgList.value.push({ role: 'system', content: streamingText.value })
          streamingText.value = ''

          recordList.value[currentKey.value] = msgList.value


          console.log('recordList', currentKey.value)
          saveHistory()
        }
      }, prompt, history ? msgList.value : [], model)
    } catch (error) {
      console.error('Error during stream:', error)
    }
  }

  return {
    streamingText,
    streaming,
    msgList,
    stream,
    saveHistory
  }
}
