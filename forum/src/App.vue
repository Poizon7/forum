<template>
  <div id="nav">
    <router-link to="/" id="logo">
      <img src="./assets/logo.png" alt="logo">
      <h1>Language forum</h1>
    </router-link>
    <form action="">
      <label for=""></label>
      <input type="text">
    </form>
    <router-link v-if="server.logedIn" to="/profile">{{ server.username }}</router-link>
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view/>
  <footer>
    <h6>This is the footer text</h6>
  </footer>
</template>

<script>
import { server } from '@/main.js'

export default {
  data () {
    return {
      server,
      mainPageTitle: 'Home'
    }
  },
  async mounted () {
    console.log(document.cookie)
    const url = 'verify'
    const data = await server.getData(url)
    console.log(data)
    server.username = data.username
    server.userid = data.userid
    server.logedIn = true
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: lightgray;
}

#logo {
  display: flex;
  align-items: center;
}

h1 {
  padding: 20px;
}

#logo > img {
  height: 100px;
  width: auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  padding: 50px;
  background-color: lightgray;
}
</style>
