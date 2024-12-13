import axios from 'axios'
import { getData, setData } from '../ipc/store'

const Request = axios.create({
  baseURL: process.env.SALONA_BACKEND_URL || 'http://127.0.0.1:8000/'
})

Request.interceptors.request.use(
  async (config) => {
    const token = getData('token')
    config.headers.Authorization = `Bearer ${token}`

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error)
)

Request.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        setData('token', '')
        console.log('Unauthorized: Handle Logout or Refresh Token')
      } else if (error.response.status === 403) {
        return Promise.reject({ data: error.response.data, status: 403 })
      }
    }
    console.error('Request Error:', error.response?.data || error.message)
    return Promise.reject(error.response?.data || error.message)
  }
)

export default Request
