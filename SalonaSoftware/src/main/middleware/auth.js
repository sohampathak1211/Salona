import axios from 'axios'

export const useRequest = () => {
  const Request = axios.create({
    // baseURL: 'http://10.0.2.2:7000',
    baseURL: 'http://192.168.1.2:7001'
    // baseURL: 'https://quiz.digiappstore.com'
  })
  Request.interceptors.request.use(
    async (config) => {
    //   const token = getData('data')
    const token = "hello"
      console.log('I AM SPEAKING FROM REQUEST HOOK ', token)
      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTE1NzE1MTMsImV4cCI6MTY5MTU3NTExMywiYXVkIjoiMTAwMDAwMDAwOSIsImlzcyI6ImRhcy5jb20ifQ.0OHjnm3-dV0ezi-C290LDvatYfBRHT8frhKc0hyBV9I';
      // if (token) {
      // }
      config.headers.Authorization = `Bearer ${token}`
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        config.headers['Content-Type'] = 'application/json'
      }
      // console.log("config : ", config)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  Request.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response) {
        if (err.response.status === 401) {
          // useAuthLogin.logout();
          console.log('Logout here')
          // originalConfig._retry = true;
          // try {
          //   const rs = await refreshToken();
          //   const { accessToken } = rs.data;
          //   var ls = JSON.parse(window.localStorage['persist:quiz']);
          //   ls.accessToken = accessToken;
          //   window.localStorage.setItem('persist:quiz', JSON.stringify(ls));
          //   Request.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          //   return Request(originalConfig);
          // } catch (_error) {
          //   window.location.href = '/';
          // }
        }
        console.log('Error in Request Hook ', err)
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject({ data: err.response.data, status: err.response.status })
        }
      }
      console.log(`Error occured`)
      return Promise.reject({ data: err.response.data, status: err.response.status })
    }
  )
  return {
    Request
  }
}
