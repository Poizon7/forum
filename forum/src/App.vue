<template>
  <div id="nav">
    <div class="home">
      <router-link to="/" id="logo">
      <img src="./assets/logo.png" alt="logo">
      <h1>Language forum</h1>
    </router-link>
    </div>
    <div class="search">
      <form action="">
      <label for=""></label>
      <input type="text" v-model="searchterm">
      <button @click.prevent="search">Search</button>
    </form>
    </div>
    <div class="profile">
      <router-link v-if="server.logedIn" to="/profile">{{ server.username }}</router-link>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </div>
  <router-view/>
  <footer>
    <h6>This is the footer text</h6>
  </footer>
</template>

<script>
import router from './router'
import { server } from '@/main.js'

export default {
  data () {
    return {
      server,
      mainPageTitle: 'Home',
      searchterm: ''
    }
  },
  methods: {
    async search () {
      server.searchterm = this.searchterm
      console.log('route')
      router.push({ path: '/search' })
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
    window.setInterval(() => {
      server.getData(url)
    }, 60000)
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

  display: grid;
  min-height: 100vh;
  grid-template-rows: min-content auto min-content;
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

.home, .search, .profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  padding: 50px;
  background-color: lightgray;
}
</style>
