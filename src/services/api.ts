import axios from 'axios'

const api = axios.create({
  baseURL: 'https://futscount.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

export default api
