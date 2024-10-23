import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import '@fortawesome/fontawesome-free/css/all.css'

Amplify.configure(outputs)

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
    },
  },
  components: {
    button: {
      paddingX: '1rem',
      paddingY: '.5rem',
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})

app.mount('#app')
