// src/api/lw_dict.js
import instance from '@/utils/request.js';

export async function getLWDict(word) {
  // 使用环境变量中的API基础路径
  const url = `/api/v1/get_lw_dict/${word}`;

  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    // 处理错误
    throw error;
  }
}