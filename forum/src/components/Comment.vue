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
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.comment {
  background-color: #bed5f0;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;

  width: max-content;
}
</style>
