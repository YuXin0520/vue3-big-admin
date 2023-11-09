import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'
export const useUserStore = defineStore(
  'token',
  () => {
    //token
    const token = ref('')
    //设置token
    const setToken = (value) => {
      token.value = value
    }
    //个人信息
    const user = ref({})
    //获取个人信息
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    //退出
    const loginOut = () => {
      token.value = ''
      user.value = {}
    }
    return {
      token,
      setToken,
      getUser,
      user,
      loginOut
    }
  },
  {
    persist: true
  }
)
