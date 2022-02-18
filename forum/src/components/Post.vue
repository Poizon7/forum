<template>
  <div class="post">
    <div class="post-title">
      <h2>{{ title }}</h2>
      <div class="post-user">
        <div class="post-user-text">
          <h3>{{ username }}</h3>
          <h3>{{date.getHours() }}:{{ date.getMinutes() }} {{ date.getDate() }}/{{date.getMonth() + 1 }}-{{ date.getFullYear() }}</h3>
        </div>
        <img :src=profilePic alt="Profile Picture">
      </div>
    </div>
    <div class="post-body">
      <p>{{ body }}</p>
    </div>
    <div class="post-control">
      <button class="post-like">Like</button>
      <button class="post-comment">Comment</button>
      <button class="post-follow">Follow</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    username: String,
    profilePic: String,
    date: Date,
    body: String
  }
}
</script>

<style scoped>
.post {
  border-radius: 20px;
  background-color: lightgray;
  padding-right: 10px;
  padding-left: 10px;
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
}

.post-body {
  padding: 10px;
  background-color: white;
  border-radius: 20px;
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

.post-follow {
  border-color: blue;
}
</style>
