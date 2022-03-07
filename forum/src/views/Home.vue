<template>
  <div id="home">
    <Post
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :username="post.username"
      :profilePicture="server.profilePic"
      :date="post.daytime"
      :body="post.text"
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
      posts: [{}],
      create: false
    }
  },
  // Test login
  methods:
  {
    addPost (title, post) {
      this.create = false
      const body = JSON.stringify({
        id: server.userid,
        title: title,
        body: post
      })
      const url = 'addPost'
      server.postData(body, url).then((data) => console.log(data))
      var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
      var d = new Date()
      d = d.toLocaleDateString('en-UK', option)
      this.posts.push({ id: '999', userid: body.id, title: body.title, text: body.post, daytime: d })
    }
  },
  async mounted () {
    const url = 'getPost'
    const response = await server.getData(url)
    var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
    response.posts.forEach(e => {
      var t = e.daytime.split(/[-:TZ]/)
      // Apply each element to the Date function
      var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
      d = d.toLocaleDateString('en-UK', option)
      e.daytime = d
      response.users.forEach(element => {
        if (element.id === e.userid) {
          e.username = element.username
        }
      })
      this.posts.push(e)
    })
    this.posts.splice(0, 1)
  }
}
</script>

<style scoped>
#home {
  width: 1024px;
  margin: auto;
  margin-top: 50px;
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
