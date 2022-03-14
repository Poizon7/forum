<template>
  <div id="profile">
    <div id="container">
      <div id="posts">
      <UserPost v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :date="post.daytime"
        :body="post.text"/>
    </div>
    <div class="info">
      <img src="@/assets/profile.png" alt="Profile Picture">
      <h2>{{ server.username }}</h2>
      <button @click="logout">Log out</button>
    </div>
    </div>
  </div>
</template>

<script>
import UserPost from '@/components/UserPost.vue'
import router from '../router'
import { server } from '@/main.js'

export default {
  components: {
    UserPost
  },
  data () {
    return {
      server,
      posts: []
    }
  },
  methods: {
    logout () {
      document.cookie = 'token=0; max-age=0'
      console.log(document.cookie)
      server.userid = ''
      server.username = ''
      server.logedIn = false
      router.push({ path: '/' })
    }
  },
  async mounted () {
    const url = 'getUserPost'
    const response = await server.getData(url)
    console.log(response)
    var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
    response.posts.forEach(e => {
      var t = e.daytime.split(/[-:TZ]/)
      // Apply each element to the Date function
      var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
      d = d.toLocaleDateString('en-UK', option)
      e.daytime = d
      this.posts.push(e)
    })
  }
}
</script>

<style scoped>
#profile {
  width: 1024px;
  margin: auto;

  display: grid;
  grid-template-rows: auto min-content auto;
}

#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  background-color: lightgray;
  border-radius: 20px;
  padding: 20px;
}

img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>
