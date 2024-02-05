<template>
    <div v-html='text' class='text'></div>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}

</script>

<style scoped>
.text {
    height:100%;
    overflow:auto;
    width:700px;
}
</style>