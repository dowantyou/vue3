import { useUserStore } from '@/store/modules/userStore.js'
import instance from '@/utils/request.js'
export async function getChatStream (messages) {
  const userStore = useUserStore()
  const url = '/api/v1/openai-sse/'
  const headers = {
    'Content-Type': 'application/json',
    'jwtString': userStore.token,
  }
  const data = {
    model: "gpt-3.5-turbo",
    messages,
    stream: true
  }
  const content = {
    'proxy': 'ZZZ',
    'endpoint': '/chat/completions',
    'data': data
  }
  try {
    const response = await instance.post(url, content, {
      headers,
      responseType: 'stream', // 请求流式响应
    })
    return response
  } catch (error) {
    throw error
  }
}