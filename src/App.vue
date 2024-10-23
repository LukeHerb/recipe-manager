<script setup lang="ts">
import Todos from './components/Todos.vue'
import Button from 'primevue/button'

import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
</script>

<template>
  <main class="h-screen flex content-center">
    <authenticator>
      <template v-slot="{ signOut }">
        <Todos :signOut="signOut" />
      </template>
    </authenticator>
  </main>
</template>
