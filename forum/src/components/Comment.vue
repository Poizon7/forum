<template>
    <div class="comment">
      <div class="title">
        <h4>{{ username }}</h4>
        <h5>{{ date }}</h5>
      </div>
      <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
  props: {
    text: String,
    username: String,
    date: String
  }
}
</script>

<style scoped>
.title {
  display: flex;
}

.comment {
  background-color: lightsteelblue;
  margin: 5px;
  border-radius: 5px;
}

h4, h5 {
  padding: 5px;
}
</style>
