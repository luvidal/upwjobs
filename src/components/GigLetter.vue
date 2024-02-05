<template>
    <div class='modal' v-if='isVisible' @click.self='closeModal'>
      <div class='modal-content' @click.stop>
        <div class='modal-header'>
          <span class='copy' @click='copyModal'><font-awesome-icon icon='copy' size='sm' /> Copy </span>
        </div>
        <textarea ref='textareaRef' rows='10' :value='text' @input='updateText'></textarea>
      </div>
    </div>
</template>
  
<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faCopy } from '@fortawesome/free-solid-svg-icons'
  library.add(faCopy);
  
  export default {
    components: { FontAwesomeIcon },
    props: {
        text: {
            type: String,
            required: true
        },
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        async copyModal() {
            const textarea = this.$refs.textareaRef;
            await navigator.clipboard.writeText(textarea.value);
        },
        closeModal() {  
            this.$emit('close') 
        },
        updateText(event) {
            this.$emit('update:text', event.target.value);
        },
    },
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .modal-content {
    width: 640px; height: 480px;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
  }
  
  .copy {
    cursor: pointer;
    padding: 10px;
  }
  
  .modal-header {
    text-align:right;
    background-color: green;
    color: white;
    padding:15px;
  }
  
  .modal-content textarea {
    outline: none;
    border:none;
    width: 100%;
    height: 85%;
    box-sizing: border-box;
    padding: 2px 16px;
  }
  </style>