<template>
  <div id="search">
    <div id="results" v-id="look">
      <div id="users">
        <h2>Users</h2>
          <div class="user" v-for="user in users" :key="user.id">
            <img src="@/assets/profile.png" alt="Profile Picture">
            <h3>{{ user.username }}</h3>
        </div>
      </div>
      <div id="posts">
        <h2>Posts</h2>
        <div id="post-container">
          <div class="post" v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
        </div>
        </div>
      </div>
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
      posts: [],
      look = false
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
#users {
  margin: 10px;
}

#posts {
  margin: 10px;
}

.user {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  padding: 10px;
  width: max-content;

  background-color: #8382c7;
  border-radius: 10px;
  text-align: center;
}

.user > img {
  width: 100px;
  border-radius: 50%;
}

#post-container {
  display: flex;
  flex-direction: row;
}

.post {
  margin: 10px;
  padding: 10px;
  width: max-content;

  background-color: #8382c7;
  border-radius: 10px;
  text-align: center;
}
</style>
