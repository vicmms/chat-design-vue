import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Avatar from 'vue-avatar'
import VueFileAgent from 'vue-file-agent';
//import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);
Vue.component('avatar', Avatar);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
