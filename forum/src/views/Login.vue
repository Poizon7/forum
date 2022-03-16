<template>
  <main>
    <h2 v-if="fail">Incorrect username or password</h2>
    <form>
      <fieldset>
          <legend>Login</legend>
          <label for="username">Username</label>
          <input name="username" type="text" v-model="user">
          <label for="password">Password</label>
          <input name="password" type="password" v-model="pass">
          <button @click.prevent="login()">Login</button>
          <button @click.prevent="signup()">Sign up</button>
          <h3>To sign up; enter a username that does not exist</h3>
        </fieldset>
    </form>
  </main>
</template>

<script>
import router from '../router'
import { server } from '@/main.js'

export default {
  data () {
    return {
      server,
      user: '',
      pass: '',
      fail: false
    }
  },
  methods: {
    async signup () {
      const body = JSON.stringify({
        username: this.user,
        password: this.pass
      })
      await server.postData(body, 'signup')
      await server.getData('verify').then((data) => {
        if (data !== null) {
          server.userid = data.userid
          server.username = data.username
          server.logedIn = true
          router.push({ path: '/profile' })
        } else {
          this.faile = true
        }
      })
    },
    async login () {
      const body = JSON.stringify({
        username: this.user,
        password: this.pass
      })
      await server.postData(body, 'login')
      await server.getData('verify').then((data) => {
        if (data !== null) {
          server.userid = data.userid
          server.username = data.username
          server.logedIn = true
        } else {
          this.faile = true
        }
      })
      router.push({ path: '/profile' })
    }
  }
}
</script>

<style scoped>
main {
  width: 1024px;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
}

fieldset {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;

  border-radius: 10px;
}
</style>
