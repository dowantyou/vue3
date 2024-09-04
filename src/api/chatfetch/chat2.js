// src\api\chatfetch\chat2.js
import { useUserStore } from '@/store/modules/userStore.js'
export async function getChatStream (messages, model) {
  const userStore = useUserStore()
  const url = '/api/v1/openai-sse/'
  const headers = {
    'Content-Type': 'application/json',
    'jwtString': userStore.token,
  }
  const data = {
    model: model,
    messages,
    stream: true
  }
  const content = {
    'proxy': 'ZZZ',
    'endpoint': '/chat/completions',
    'data': data
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(content),
    })
    return response
  } catch (error) {
    throw error
  }

}