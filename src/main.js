import Vue from 'vue';
import App from './App';
import GridIcon from './components/GridIcon';

Vue.component('GridIcon', GridIcon);

new Vue({
  components:{GridIcon},
  render:h=>h(App),
}).$mount('#app');


