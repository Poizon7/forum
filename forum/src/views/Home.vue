<template>
  <div id="home">
    <Post
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :username="post.username"
      :profilePicture="server.profilePic"
      :date="post.daytime"
      :body="post.text"
      :likes="post.likes"
      :liked="post.liked"
    />
    <button @click="this.create = !this.create" v-if="!create && server.logedIn">+</button>
    <PostTemplate v-if="create" @post="addPost" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import PostTemplate from '@/components/PostTemplate.vue'
import { server } from '@/main.js'

export default {
  components: {
    Post,
    PostTemplate
  },
  data () {
    return {
      server,
      posts: [],
      create: false
    }
  },
  // Test login
  methods:
  {
    async addPost (title, post) {
      this.create = false
      const body = JSON.stringify({
        id: server.userid,
        title: title,
        body: post
      })
      console.log(body)
      await server.postData(body, 'addPost')
      var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
      var d = new Date()
      d = d.toLocaleDateString('en-UK', option)
      this.posts.push({ id: '999', userid: server.userid, title: title, text: post, daytime: d })
    }
  },
  async mounted () {
    const response = await server.getData('getPost')
    let liked
    if (server.logedIn) {
      liked = await server.getData('liked')
    }
    console.log(response)
    var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
    response.posts.forEach(async e => {
      const t = e.daytime.split(/[-:TZ]/)
      // Apply each element to the Date function
      let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
      d = d.toLocaleDateString('en-UK', option)
      e.daytime = d
      if (server.logedIn) {
        liked.forEach(el => {
          if (el.postid === e.id) {
            e.liked = true
          }
        })
      }
      this.posts.push(e)
    })
  }
}
</script>

<style scoped>
#home {
  width: 1024px;
  margin: auto;
}

button {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 0;
  background-color: red;
  color: black;
  font-size: 32px;
}
</style>
