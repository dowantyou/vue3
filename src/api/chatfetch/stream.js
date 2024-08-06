import { getChatStream } from './chat2'

export function parsePack (str) {
  // 定义正则表达式匹配模式
  const pattern = /data:\s*({.*?})\s*\n/g
  // 定义一个数组来存储所有匹配到的 JSON 对象
  const result = []
  // 使用正则表达式匹配完整的 JSON 对象并解析它们
  let match
  while ((match = pattern.exec(str)) !== null) {
    const jsonStr = match[1]
    try {
      const json = JSON.parse(jsonStr)
      result.push(json)
    } catch (e) {
      console.error(e)
    }
  }
  // 返回所有解析出的 JSON 对象
  return result
}

export async function StreamGpt (options, prompt, history = []) {
  let finish = false
  let count = 0

  const { onStart, onCreated, onPatch, onDone } = options

  // 触发onStart
  onStart && onStart(prompt)

  const response = await getChatStream([...history, { role: 'user', content: prompt }])
  if (!response.body) return

  // 从response中获取reader
  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  while (!finish) {
    const { value, done } = await reader.read()

    if (done) {
      finish = true
      // 触发onDone
      onDone && onDone()
      break
    }

    count++
    const jsonArray = parsePack(decoder.decode(value))

    if (count === 1) {
      // 触发onCreated
      onCreated && onCreated()
    }

    jsonArray.forEach((json) => {
      if (!json.choices || json.choices.length === 0) {
        return
      }
      const text = json.choices[0].delta.content
      // 触发onPatch
      onPatch && onPatch(text)
    })
  }
}