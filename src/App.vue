<template>
  <div class='main'>
    <div v-if='isLoading' class='overlay hourglass'></div>
    <GigLetter :is-visible='isModalVisible' :text='text' @close='closeModal' />
    <GigsForm @data-updated='updateContent' />
    <GigsList :data='data' @show-modal='openModal' />
  </div>
</template>

<script>
import GigsList from './GigsList.vue'
import GigsForm from './components/GigsForm.vue'
import GigLetter from './components/GigLetter.vue'
import Upwork from './upwork.js';
import Letter from './chatgpt.js';

export default {
  components: { GigsForm, GigsList, GigLetter },
  data() {
    return {
      isLoading: false,
      isModalVisible: false,
      data: [],
      text: '',
    };
  },
  methods: {
    updateContent(params) {
      this.isLoading = true;
      Upwork(params)
        .then(data => this.data = data )
        .catch(error => console.error('Error fetching Upwork data:', error))
        .finally(() => this.isLoading = false)
    },
    async openModal(item) {
      this.isLoading = true;
      this.text = '';
      this.text = await Letter(item)
      this.isModalVisible = true
      this.isLoading = false;
    },
    closeModal() {
      this.text = '';      
      this.isModalVisible = false
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  flex-direction: row;
}

.hourglass {
  cursor: wait;
}

.overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(200, 200, 200, 0.1);
  z-index: 9999;
  pointer-events: none;
}
</style>