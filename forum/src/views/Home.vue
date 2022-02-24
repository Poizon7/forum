<template>
  <div id="home">
    <Post
      v-for="(post) in posts"
      :key="post.id"
      :title="post.title"
      :username="users[0].username"
      :profilePicture="users[0].profilePic"
      :date="post.daytime"
      :body="post.text"
    />
    <button @click="createPost()" v-if="!create">+</button>
    <PostTemplate v-if="create" @post="addPost" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import PostTemplate from '@/components/PostTemplate.vue'

export default {
  components: {
    Post,
    PostTemplate
  },
  data () {
    return {
      posts: [{}],
      users: [{ username: 'Poizon', profilePic: '../assets/profile.png' }],
      userid: '1',
      serverURL: 'http://10.156.10.133:3000/',
      create: false
    }
  },
  // Test login
  methods:
  {
    signup () {
      const body = JSON.stringify({
        username: 'Poizon',
        password: 'password'
      })
      const url = 'signup'
      this.postData(body, url).then(console.log('signed up'))
    },
    createPost () {
      this.create = true
    },
    addPost (title, post) {
      const body = JSON.stringify({
        id: this.userid,
        title: title,
        body: post
      })
      const url = 'addPost'
      this.postData(body, url).then((data) => console.log(data))
    },
    async postData (data, url) {
      const response = await fetch(this.serverURL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      return response.json()
    }
  },
  async mounted () {
    const url = 'getPost'
    const response = await fetch(this.serverURL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    var temp
    var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
    await response.json().then(data => { temp = data })
    temp.forEach(e => {
      var t = e.daytime.split(/[-:TZ]/)
      // Apply each element to the Date function
      var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
      d = d.toLocaleDateString('en-UK', option)
      e.daytime = d
      console.log(e)
      this.posts.push(e)
    })
    this.posts.splice(0, 1)
    console.log(this.posts)
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
