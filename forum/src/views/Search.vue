<template>
  <div id="search">
    <div class="user" v-for="user in users" :key="user.id">
      <img src="@/assets/profile.png" alt="Profile Picture">
      {{ user.username }}
    </div>
    <div class="post" v-for="post in posts" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>

<script>
import { server } from '@/main.js'

export default {
  data () {
    return {
      server,
      users: [],
      posts: []
    }
  },
  async mounted () {
    const url = 'search'
    const body = JSON.stringify({
      search: server.searchterm
    })

    const response = await server.postData(body, url)
    this.users = response.users
    this.posts = response.posts
  }
}
</script>

<style scoped>

</style>
