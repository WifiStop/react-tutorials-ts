import axios, { AxiosInstance } from 'axios'
import { message } from 'antd'
message.config({ maxCount: 3 })

const MOCK_API = 'https://www.fastmock.site/mock/2ae383082cdd470dcb23c2c98acf7a13/llf-mock'
const whiteApi = ['login', 'register', 'send/code', 'reset/password']


const http = axios.create({
  baseURL: MOCK_API,
  timeout: 1000 * 60 * 3
})
http.interceptors.request.use(function(config) {
    const { url } = config
    if (!whiteApi.includes(url as string)) {
      const token = window.sessionStorage.getItem('token')
      if (!token) {
        return Promise.reject({
          "code": 4002,
          "message": "为获取到令牌，请先登录",
          "data": null
        })
      }
      config.headers.Authorization = token
    }
    return config
  }, function(error) {
    return Promise.reject(error)
  })
  
  http.interceptors.response.use(function(response) {
    const data = response.data
    if (data.code === 200) {
      return Promise.resolve(data);
    } else {
      message.error(data.message || data.desc)
      return Promise.reject(response)
    }
  }, function(error) {
    if (error.code === 4002) {
      message.error(error.message)
      window.location.href = '#/login'
      return Promise.reject(error)
    }
    return Promise.reject(error.response)
  })
export default http
