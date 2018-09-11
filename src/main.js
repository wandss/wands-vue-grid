import Vue from 'vue';
import App from './App';
import AppButton from './components/AppButton';

Vue.component('AppButton', AppButton);

new Vue({
  components:{AppButton},
  render:h=>h(App),
}).$mount('#app');


/*TODO
 * Hide columns when creating Grid.
 * Attention to ID column
 *
 *
 */
