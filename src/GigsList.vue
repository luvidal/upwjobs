<template>
  <div class='list'>
    <div v-for='(item, index) in data' :key='index'>
      <GigVessel :item='item' @show-modal='handleShowModal'/>
    </div>
  </div>
</template>

<script>
import GigVessel from './GigVessel.vue';

export default {
  components: { GigVessel },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleShowModal(item) {
      this.$emit('show-modal', item);
    }
  }
}
</script>

<style scoped>
.list {
  flex:1;
  overflow:auto;
}
</style>