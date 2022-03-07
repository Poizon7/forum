import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

export const server = reactive({
  username: '',
  userid: '',
  profilePic: '../assets/profile.png',
  logedIn: false,
  serverURL: 'http://192.168.68.110:3000/',
  async postData (data, url) {
    const response = await fetch(this.serverURL + url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    return response.json()
  },
  async getData (url) {
    const response = await fetch(this.serverURL + url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
})

createApp(App).use(router).mount('#app')
