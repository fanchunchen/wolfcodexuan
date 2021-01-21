import axios from 'axios'
const service = axios.create({
  baseURL: 'http://kumanxuan1.f3322.net:8001',
  timeout: 5000
})
service.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['X-Nideshop-Token'] = token
  }
  return config
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})
export default service
