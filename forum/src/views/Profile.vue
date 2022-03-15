<template>
  <div id="profile">
    <Profile :id="server.userid" />
  </div>
</template>

<script>
import Profile from '@/components/Profile.vue'
import { server } from '@/main.js'

export default {
  components: {
    Profile
  },
  data () {
    return {
      server
    }
  }
}
</script>

<style scoped>
#profile {
  width: 1024px;
  margin: auto;
}
</style>
