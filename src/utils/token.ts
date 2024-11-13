
// 存储 Token 到 localStorage
export function setToken(data: any) {
    // 编码为 Base64 格式
    const token = btoa(JSON.stringify(data));
    localStorage.setItem('token', token);
  }
  
  // 从 localStorage 获取 Token 并解码
  export function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // 解码 Base64 并解析 JSON
        return JSON.parse(atob(token));
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  }
  
  // 移除 Token
  export function removeToken() {
    localStorage.removeItem('token');
  }
  