<template>
  <form class="post">
    <input v-model="title">
    <textarea v-model="body" id="" cols="30" rows="10"></textarea>
    <button @click.prevent="$emit('post', title, body)">Post</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      body: ''
    }
  }
}
</script>

<style scoped>
.post {
  border-radius: 20px;
  background-color: lightgray;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
}

input {
  border-radius: 20px;
  font-size: 20px;
}

textarea {
  border-radius: 20px;
  font-size: 20px;
}
</style>
