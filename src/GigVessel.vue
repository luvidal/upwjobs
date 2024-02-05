<template>
  <div class='vessel'>
    <div class='title truncate' @click='toggleDiv'>
      {{ item.title }}
      <span class='toggle'><font-awesome-icon :icon="showDiv ? 'angle-up' : 'angle-down'" style='font-size:12px;'/></span>
    </div>
    <div v-if='showDiv'>
      <div class='content'>
        <GigText :text='item.description' />
        <GigProps :item='item'/>
      </div>
      <div class='buttons'>
        <button @click='view()'><font-awesome-icon icon='eye'/></button>
        <button @click='apply()'><font-awesome-icon icon='pen'/></button>
        <button @click='letter()'><font-awesome-icon icon='scroll'/></button>
      </div>
    </div>
  </div>
</template>

<script>

import GigProps from './components/GigProps.vue'
import GigText from './components/GigText.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faEye, faPen, faScroll } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleDown, faAngleUp, faEye, faPen, faScroll)

export default {
  components: { GigText, GigProps, FontAwesomeIcon },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDiv: true,
      showModal: false,
    };
  },
  methods: {
    view() {
      this.show(`https://www.upwork.com/jobs/~${this.item.jobid}`)
    },
    apply() {
      this.show(`https://www.upwork.com/ab/proposals/job/~${this.item.jobid}/apply/`)
    },
    letter() {
      this.$emit('show-modal', { ...this.item })
    },
    toggleDiv() {
      this.showDiv = !this.showDiv;
    }
  }
}
</script>

<style scoped>
.vessel {
  background-color:rgba(255, 255, 255, 0.03);
  border-radius:10px;
  margin:40px; 
}

.title {
  position:relative;
  cursor: pointer;
  font-size:200%; 
  font-weight:bold;
  padding:40px;
}

.toggle {
  position: absolute;
  top:10px; right:10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
}

.content {
  display:flex;
  justify-content:space-between;
  height:400px;
  padding:0px 40px;
}

.buttons {
  text-align:center;
  padding:30px;
}

.buttons button {
  margin:0px 5px;
}

</style>