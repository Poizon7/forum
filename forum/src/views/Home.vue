<template>
  <div id="home">
    <Post
      v-for="(post, i) in posts"
      :key="i"
      :title="post.title"
      :username="post.username"
      :profilePicture="post.profilePic"
      :date="post.date"
      :body="post.body"
    />
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  components: {
    Post
  },
  data () {
    return {
      posts: [{ title: 'Imersion', username: 'Poizon', profilePic: '../assets/profile.png', date: new Date(), body: 'This is a post' }]
    }
  }
}
</script>

<style scoped>
#home {
  width: 1024px;
  margin: auto;
  margin-top: 50px;
}
</style>
