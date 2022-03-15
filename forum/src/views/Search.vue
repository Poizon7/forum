<template>
  <div id="search">
    <div id="results" v-if="look">
      <h2>Search results for: {{server.searchterm}}</h2>
      <div id="users">
        <h2>Users</h2>
        <div id="user-container">
          <div class="user" v-for="user in users" :key="user.id" @click="showUser(user.id)">
            <img src="@/assets/profile.png" alt="Profile Picture">
            <h3>{{ user.username }}</h3>
          </div>
        </div>
      </div>
      <div id="posts">
        <h2>Posts</h2>
        <div id="post-container">
          <div class="post" v-for="post in posts" :key="post.id" @click="showPost(post.id)">
            <h3>{{ post.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div id="user">
      <Profile :id="activeUser" v-if="viewUser" @back="back" />
    </div>
    <div id="post">
      <Post
        :id="activePost.id"
        :title="activePost.title"
        :username="activePost.username"
        :profilePicture="server.profilePic"
        :date="activePost.daytime"
        :body="activePost.text"
        :likes="activePost.likes"
        :liked="activePost.liked"
        :search="true"
        v-if="viewPost"
        @back="back" />
    </div>
  </div>
</template>

<script>
import Profile from '@/components/Profile.vue'
import Post from '@/components/Post.vue'
import { server } from '@/main.js'

export default {
  components: {
    Profile,
    Post
  },
  data () {
    return {
      server,
      users: [],
      posts: [],
      look: true,
      viewUser: false,
      activeUser: '',
      viewPost: false,
      activePost: {}
    }
  },
  methods: {
    showUser (id) {
      this.activeUser = id
      this.look = false
      this.viewUser = true
    },
    async showPost (id) {
      const body = JSON.stringify({
        id: id
      })
      const response = await server.postData(body, 'getSpecificPost')
      let liked
      if (server.logedIn) {
        liked = await server.getData('liked')
      }
      this.activePost = response[0]

      var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
      const t = this.activePost.daytime.split(/[-:TZ]/)
      // Apply each element to the Date function
      let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
      d = d.toLocaleDateString('en-UK', option)
      this.activePost.daytime = d
      if (server.logedIn) {
        liked.forEach(el => {
          if (el.postid === this.activePost.id) {
            this.activePost.liked = true
          }
        })
      }

      this.look = false
      this.viewPost = true
    },
    back () {
      this.activeUser = ''
      this.activePost = {}
      this.look = true
      this.viewUser = false
      this.viewPost = false
    }
  },
  async mounted () {
    const body = JSON.stringify({
      search: server.searchterm
    })

    const response = await server.postData(body, 'search')
    this.users = response.users
    this.posts = response.posts
  },
  async beforeUpdate () {
    const body = JSON.stringify({
      search: server.searchterm
    })

    const response = await server.postData(body, 'search')
    this.users = response.users
    this.posts = response.posts
  }
}
</script>

<style scoped>
#search {
  width: 1024px;
  margin: auto;
}
#users {
  margin: 10px;
}

#user-container {
  display: flex;
  flex-direction: row;
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

  background-color: #97BBE6;
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

  background-color: #97BBE6;
  border-radius: 10px;
  text-align: center;
}
</style>
