import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

export const server = reactive({
  username: '',
  userid: '',
  profilePic: '../assets/profile.png',
  logedIn: false,
  serverURL: 'http://10.151.172.105:3000/',
  searchterm: '',
  timeOption: { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' },
  timeFormat: 'en-UK',
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
