import request from '@/api/request'
//注册请求
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
//登录请求
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
//获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')

//更新用户信息
export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)

//更新密码
export const userUpdatePasswordService = (data) =>
  request.patch('/my/updatepwd', data)

//更换头像
export const userUpdateAvatarService = (data) =>
  request.patch('/my/update/avatar', { avatar: data })
