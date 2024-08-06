import { useUserStore } from '@/store/modules/userStore.js'
//ChatGpt流式传输
export async function getChatStream (messages) {
  const userStore = useUserStore()
  const url = '/api/v1/openai-sse/'
  const headers = {
    'Content-Type': 'text/event-stream',
    'jwtString': userStore.token, // 确保替换为有效的JWT字符串
  }
  const payload = {
    proxy: 'zzz', // 使用智增增代理
    endpoint: '/chat/completions', // 聊天接口
    data: {
      model: "gpt-3.5-turbo",
      messages,
      stream: true
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        payload
      ), // 直接使用payload
    })
    console.log(JSON.stringify(payload))
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}