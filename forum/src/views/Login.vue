<template>
  <div class="about">
    <form>
      <input type="text" v-model="user">
      <input type="password" v-model="pass">
      <button @click.prevent="login()">Login</button>
      <button @click.prevent="signup()">Sign up</button>
    </form>
  </div>
</template>

<script>
import { server } from '@/main.js'

export default {
  data () {
    return {
      server,
      user: '',
      pass: ''
    }
  },
  methods: {
    signup () {
      const body = JSON.stringify({
        username: this.user,
        password: this.pass
      })
      const url = 'signup'
      server.postData(body, url).then(console.log('signed up'))
    },
    login () {
      const body = JSON.stringify({
        username: this.user,
        password: this.pass
      })
      const url = 'login'
      server.postData(body, url)
      server.logedIn = true
    }
  }
}
</script>
