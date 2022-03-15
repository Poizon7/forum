<template>
  <div class="post">
    <h6 @click="$emit('back')" v-if="search">return</h6>
    <div id="container">
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
        <button class="post-like" v-if="activeLiked || (!server.logedIn && activeLikes > 0)" @click="unLike">
          <img src="@/assets/liked.png" alt="">
          <h4>{{ activeLikes }}</h4>
        </button>
        <button class="post-like" v-else @click="like">
          <img src="@/assets/like.png" alt="">
          <h4>{{ activeLikes }}</h4>
        </button>
        <button class="post-comment" v-if="!commenting  && server.logedIn" @click="commenting = true">
          <h4>Comment</h4>
        </button>
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
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
import router from '../router'
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
    liked: Boolean,
    search: Boolean
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
      if (server.logedIn) {
        const body = JSON.stringify({
          id: this.id
        })
        server.postData(body, 'like')
        this.activeLikes++
        this.activeLiked = true
      } else {
        router.push({ path: '/login' })
      }
    },
    unLike () {
      if (server.logedIn) {
        const body = JSON.stringify({
          id: this.id
        })
        server.postData(body, 'unLike')
        this.activeLikes--
        this.activeLiked = false
      } else {
        router.push({ path: '/login' })
      }
    },
    async getComments () {
      const body = JSON.stringify({
        id: this.id
      })
      const response = await server.postData(body, 'getComments')
      response.comments.forEach(e => {
        const t = e.daytime.split(/[-:TZ]/)
        // Apply each element to the Date function
        let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
        d = d.toLocaleDateString(server.timeFormat, server.timeOption)
        e.daytime = d

        this.comments.push(e)
      })
      this.activeComments = true
    },
    async comment () {
      if (server.logedIn) {
        this.commenting = false
        const url = 'comment'
        const body = JSON.stringify({
          id: this.id,
          text: this.text
        })
        await server.postData(body, url)
      } else {
        router.push({ path: '/login' })
      }
    }
  }
}
</script>

<style scoped>
#container {
  border-radius: 10px;
  background-color: #97BBE6;
  padding: 10px;
  margin: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title h2 {
  margin-left: 10px;
}

.post-user {
  display: flex;
  gap: 10px;
}

.post-user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.post-body {
  padding: 10px;
  background-color: white;
  border-radius: 10px;
}

.post-control {
  display: flex;
  gap: 20px;
}

.post-like {
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: transparent;
  border-color: transparent;
}

.post-like > img {
  width: 40px;
  height: auto;
}

.post-like > h4 {
  font-size: 24px;
}

.post-comment {
  background-color: transparent;
  border-color: black;
  border-width: 2px;
  border-radius: 10px;
}

.post-comment > h4 {
  font-size: 18px;
}

img {
  height: 50px;
  width: auto;
  border-radius: 25px;
}

.comment-btn {
  background-color: transparent;
  border-color: transparent;
}
</style>
