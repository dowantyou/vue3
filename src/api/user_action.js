// src/api/user_action.js
import instance from '@/utils/request.js';

// 接口调用：获取 JWT
export async function getJWTByPassword(usernameOrPhoneOrEmail, password) {
  const content = {
    username_or_phone_or_email: usernameOrPhoneOrEmail,
    password: password
  };
  
  try {
    const response = await instance.post('/api/v1/get_jwt_by_password/', content);
    return response;
  } catch (error) {
    // 处理错误
    throw error;
  }
}
