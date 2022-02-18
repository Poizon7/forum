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
    <router-link to="/profile">About</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  data () {
    return {
      mainPageTitle: 'Home'
    }
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
</style>
