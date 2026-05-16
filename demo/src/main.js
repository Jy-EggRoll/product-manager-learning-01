import { createApp } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'
import './style.css'
import App from './App.vue'
import router from './router'

AOS.init({
  duration: 600,
  once: true,
  offset: 20,
  delay: 50,
  easing: 'ease-out-cubic'
})

const app = createApp(App)
app.use(router)
app.mount('#app')
