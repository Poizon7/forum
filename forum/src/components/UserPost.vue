<template>
  <div class="post" @click="view = !view">
    <div class="post-title">
      <h3>{{ title }}</h3>
      <h4>{{ date }}</h4>
    </div>
    <p v-if="view" class="post-body">{{ body }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    date: String,
    body: String
  },
  data () {
    return {
      view: false
    }
  }
}
</script>

<style scoped>
.post {
  border-radius: 20px;
  background-color: #97BBE6;
  padding-right: 10px;
  padding-left: 10px;
  margin: 20px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.post-body {
  padding: 10px;
  background-color: white;
  border-radius: 20px;
}
</style>
