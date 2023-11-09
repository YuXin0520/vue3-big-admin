import request from '@/api/request'
//注册请求
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
//登录请求
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
//获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')
