// src/api/user_action.js
import instance from '@/utils/request.js';
import useUserStore from '@/store/modules/userStore.js'; 
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

// 接口调用：获取用户头像的 base64 编码
export async function getUserProfile() {
  const userStore = useUserStore();
  const headers = {
    'Content-Type': 'application/json',
    'jwtString': userStore.token,
  };
  
  try {
    const response = await instance.get('/api/v1/get_user_avatar/', { headers });
    return response;
  } catch (error) {
    // 处理错误
    throw error;
  }
}
// 接口调用：获取用户基本信息
export async function getUserInfo() {
  const userStore = useUserStore();
  const headers = {
    'Content-Type': 'application/json',
    'jwtString': userStore.token,
  };

  try {
    const response = await instance.get('/api/v1/get_user_basic_info/', { headers });
    return response;
  } catch (error) {
    // 处理错误
    throw error;
  }
}
