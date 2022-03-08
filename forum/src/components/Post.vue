<template>
  <div class="post">
    <div class="post-title">
      <h2>{{ title }}</h2>
      <div class="post-user">
        <div class="post-user-text">
          <h3>{{ username }}</h3>
          <h3>{{ date }}</h3>
        </div>
        <img src="@/assets/profile.png" alt="Profile Picture">
      </div>
    </div>
    <div class="post-body">
      <p>{{ body }}</p>
    </div>
    <div class="post-control">
      <button class="post-like" v-if="activeLiked" @click="unLike">Unlike {{ activeLikes }}</button>
      <button class="post-like" v-else @click="like">Like {{ activeLikes }}</button>
      <button class="post-comment" v-if="!commenting" @click="commenting = true">Comment</button>
    </div>
    <form v-if="commenting">
      <textarea v-model="text" id="" cols="30" rows="1"></textarea>
      <button class="post-comment" v-if="commenting" @click.prevent="comment">Comment</button>
    </form>
    <div class="commets">
      <button class="comment-btn" @click="getComments" v-if="!activeComments">view comments</button>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :username="comment.username"
        :date="comment.daytime"
        :text="comment.text" />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
import { server } from '@/main.js'

export default {
  components: {
    Comment
  },
  props: {
    title: String,
    id: Number,
    username: String,
    profilePic: String,
    date: String,
    body: String,
    likes: Number,
    liked: Boolean
  },
  data () {
    return {
      server,
      comments: [],
      activeLikes: this.likes,
      activeLiked: this.liked,
      activeComments: false,
      commenting: false,
      text: ''
    }
  },
  methods: {
    like () {
      const url = 'like'
      const body = JSON.stringify({
        id: this.id
      })
      server.postData(body, url)
      this.activeLikes++
      this.activeLiked = true
    },
    unLike () {
      const url = 'unLike'
      const body = JSON.stringify({
        id: this.id
      })
      server.postData(body, url)
      this.activeLikes--
      this.activeLiked = false
    },
    async getComments () {
      const url = 'getComments'
      const body = JSON.stringify({
        id: this.id
      })
      console.log(body)
      const response = await server.postData(body, url)

      console.log(response)
      var option = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', secound: 'numeric' }
      response.comments.forEach(e => {
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
        this.comments.push(e)
      })
      this.activeComments = true
    },
    async comment () {
      this.commenting = false
      const url = 'comment'
      const body = JSON.stringify({
        id: this.id,
        text: this.text
      })
      await server.postData(body, url)
    }
  }
}
</script>

<style scoped>
.post {
  border-radius: 10px;
  background-color: lightgray;
  padding: 10px;
  margin: 20px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.post-user {
  display: flex;
}

.post-user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
}

.post-body {
  padding: 10px;
  background-color: white;
  border-radius: 10px;
}

.post-control {
  padding: 10px;
  display: flex;
  gap: 20px;
}

button {
  padding: 5px;
  border-radius: 10px;
  border-width: 5px;
}

.post-like {
  border-color: red;
}

.post-comment {
  border-color: green;
}

img {
  height: 50px;
  width: auto;
  border-radius: 25px;
}
</style>
