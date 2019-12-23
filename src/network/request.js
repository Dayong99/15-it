import axios from 'axios'

export function request(config) {
  /**
   * axios网络封装
   */
    // 1.创建axios的实例
  const instance = axios.create({
      baseURL:'http://www.liulongbin.top:3005/api',
      timeout: 5000
    })

  return instance(config)
}
