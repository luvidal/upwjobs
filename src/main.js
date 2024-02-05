import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.config.globalProperties.show = function(url) 
{
  window.open(url, 'window', 'width=1600,height=1200')
}

app.mount('#app');
