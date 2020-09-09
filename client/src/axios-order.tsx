import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-app-c0e9b.firebaseio.com/'
})

export default instance;