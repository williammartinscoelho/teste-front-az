<template>
  <div class="home">
    
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.$api.get('/posts').then(response => {
      this.data = response.data
    })
  }
}
</script>
