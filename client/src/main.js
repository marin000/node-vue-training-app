import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import store from './store'

createApp(App).use(router).use(VuesticPlugin).use(store).mount('#app')
