<template>
  <div id="nav">
    <div class="home">
      <router-link to="/" id="logo">
      <h1>Language forum</h1>
    </router-link>
    </div>
    <div class="search">
      <form action="">
      <label for=""></label>
      <input type="text" v-model="searchterm">
      <button @click.prevent="search">
        <img src="@/assets/search.png" alt="">
      </button>
    </form>
    </div>
    <div class="profile">
      <router-link v-if="server.logedIn" to="/profile">{{ server.username }}</router-link>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </div>
  <router-view/>
  <footer>
    <h6>Contact</h6>
    <h6>Email: ekby.viktor@elev.ga.ntig.se</h6>
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
    const data = await server.getData('verify')
    console.log(data)
    server.username = data.username
    server.userid = data.userid
    server.logedIn = true
    window.setInterval(() => {
      server.getData('verify')
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

body {
  background-color: #eeeeee;
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
  background-color: #6FEC79;
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
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #000000;
}

.home, .search, .profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search form {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search form input {
  border-radius: 10px;
}

.search button {
  background-color: transparent;
  border-color: transparent;
}

.search img {
  width: 30px;
  height: auto;
}

footer {
  padding: 50px;
  background-color: #6FEC79;
}
</style>
