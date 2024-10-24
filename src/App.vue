<script setup lang="ts">
import Todos from './components/Todos.vue'

import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import Button from 'primevue/button'
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId }}</h1>
        <div class="flex justify-end p-1">
          <Button class="p-2" @click="signOut">Sign out</Button>
        </div>
        <Todos />
      </template>
    </authenticator>
  </main>
</template>
