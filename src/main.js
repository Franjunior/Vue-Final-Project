

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const app = createApp(App)
app.use(Swal);
window.Swal = app.config.globalProperties.$swal;
app.mount('#app')


