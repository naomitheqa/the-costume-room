// Token Service

export const TokenService = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token){
    localStorage.setItem('token', token);
    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem('tokenExpiration', expirationTime);
  },

  isTokenExpired(){
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return true;
    return new Date().getTime() > expirationTime;
  },

 removeToken(){
    localStorage.removeItem('token');
  }
};
