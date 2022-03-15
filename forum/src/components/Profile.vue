<template>
  <div id="profile">
    <h6 @click="$emit('back')" v-if="id != server.userid">return</h6>
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
        <h2>{{ username }}</h2>
        <button @click="logout" v-if="id == server.userid">Log out</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserPost from '@/components/UserPost.vue'
import router from '../router'
import { server } from '@/main.js'

export default {
  props: {
    id: Number
  },
  components: {
    UserPost
  },
  data () {
    return {
      server,
      posts: [],
      username: ''
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
    const body = JSON.stringify({
      id: this.id
    })
    let response = await server.postData(body, 'getUserPost')

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

    response = await server.postData(body, 'user')
    console.log(response)
    this.username = response[0].username
  }
}
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  background-color: #97BBE6;
  border-radius: 20px;
  padding: 20px;
}

img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>
