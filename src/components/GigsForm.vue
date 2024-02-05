<template>
  <div class='form'>
    <form @submit.prevent='updateParams'>
      <div>
        <label for='q'>Search</label>
        <input type='text' v-model='q' placeholder='Criteria' style='width:200px;'>
      </div>
      <div>
        <label for='proposals'>Proposals</label>
        <input type='text' v-model='proposals' placeholder='proposals' style='width:60px;'>
      </div>
      <div>
        <label for='paging'>Paging</label>
        <input type='text' v-model='paging' placeholder='start-end' style='width:60px;'>
      </div>
      <div class='divbutton'>
        <button type='submit'><font-awesome-icon icon='rotate'/></button>
      </div>
    </form>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

library.add(faRotate);

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      q: '',
      proposals: '0-4,5-9',
      paging: '0;10',
    }
  },
  created() {
    this.updateParams();
  },
  methods: {
    updateParams() {
        const params = { q:this.q, proposals:this.proposals, paging:this.paging }
        this.$emit('data-updated', params);
    }
  }
}

</script>

<style scoped>
    
.form {
  background-color:rgba(255, 255, 255, 0.06);
  padding:30px;
}

.form form div {
  margin-bottom:30px;
}

.form form label {
  display:block;
  padding:5px;
}

.divbutton {
  text-align:right;
}

</style>