<template>
  <Toast />
  <main
    class="flex flex-col h-screen w-3/12 m-auto justify-center content-center gap-3"
  >
    <Button @click="submitTodo">Add Todo</Button>
    <div v-if="showInput" class="flex justify-between">
      <InputText
        v-model="todoContent"
        placeholder="Todo content"
        class="w-8/12"
      />
      <Button severity="success" @click="createTodo">
        <i class="fa-solid fa-plus"></i>
      </Button>
      <Button severity="danger" @click="() => (showInput = false)">
        <i class="fa-solid fa-x"></i>
      </Button>
    </div>

    <ul class="flex flex-col w-full gap-6">
      <li
        v-for="todo in todos"
        :key="todo.id"
        @click="deleteTodo(todo.id)"
        class="cursor-pointer bg-slate-100 p-2 rounded-lg w-full flex justify-between content-center"
      >
        {{ todo.content }}
        Created by: {{ props.user.signInDetails.loginId }}
        <i class="fa-solid fa-trash-can flex content-center text-red-500"></i>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import '@/assets/main.css'
import { onMounted, ref } from 'vue'
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const client = generateClient<Schema>()

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']['type']>>([])
const showInput = ref(false)
const todoContent = ref('')

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items
    },
  })
}

function submitTodo() {
  showInput.value = true
}

function createTodo() {
  client.models.Todo.create({
    content: todoContent.value,
    owner: props.user.signInDetails.loginId, // Attach the user
  }).then(() => {
    // After creating a new todo, update the list of todos
    toast.add({
      severity: 'success',
      summary: 'Todo Created',
      detail: 'Your todo has been created successfully',
      life: 3000,
    })
    listTodos()

    // Reset the input field
    todoContent.value = ''
    showInput.value = false
  })
}

function deleteTodo(id: string) {
  client.models.Todo.delete({ id })

  // After deleting a todo, update the list of todos
  toast.add({
    severity: 'error',
    summary: 'Todo Deleted',
    detail: 'Your todo has been deleted successfully',
    life: 3000,
  })
  listTodos()
}

// fetch todos when the component is mounted
onMounted(() => {
  listTodos()
})
</script>
