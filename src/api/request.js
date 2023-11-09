import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    //携带请求头
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    //return response.data
    // 2xx 范围内的状态码都会触发该函数。
    if (response.data.code === 0) {
      return response
    }
    // // 对响应数据做点什么,
    // //失败给错误提示
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    //401或权限过期
    if (error.response?.status === 401) {
      router.push('/login')
    }
    // 对响应错误做点什么
    ElMessage.error(error || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
