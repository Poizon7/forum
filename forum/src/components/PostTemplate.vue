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
  background-color: #97BBE6;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
}

input {
  border-radius: 10px;
  font-size: 20px;
  padding: 3px;
}

textarea {
  border-radius: 10px;
  font-size: 20px;
  padding: 3px;
}
</style>
