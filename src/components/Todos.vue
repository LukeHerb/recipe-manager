<template>
  <main class="flex flex-col w-3/12 m-auto gap-2">
    <Button class="w-full" @click="showInput = true">+ new</Button>
    <ul class="flex flex-col gap-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        @click="deleteTodo(todo.id)"
        class="cursor-pointer w-full bg-slate-200 p-2 rounded-lg flex justify-between content-center"
      >
        {{ todo.content }}
        <i class="fa-solid fa-trash-can text-red-500 flex content-center"></i>
      </li>
    </ul>
    <div v-if="showInput" class="w-full flex justify-between">
      <InputText
        v-model="newTodoContent"
        placeholder="Enter todo content"
        class="w-9/12"
      />
      <Button @click="submitTodo">Submit</Button>
    </div>
    <Button class="w-full" @click="signOut">Sign Out</Button>
  </main>
</template>

<script setup>
import '@/assets/main.css'
import { onMounted, ref } from 'vue'
import { generateClient } from 'aws-amplify/data'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps(['signOut'])

const client = generateClient()

// create a reactive reference to the array of todos
const todos = ref([])
const showInput = ref(false)
const newTodoContent = ref('')

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items
    },
  })
}

function createTodo() {
  showInput.value = true
}

function submitTodo() {
  if (newTodoContent.value.trim() !== '') {
    client.models.Todo.create({
      content: newTodoContent.value,
    }).then(() => {
      // After creating a new todo, update the list of todos
      listTodos()
      // Reset input field and hide it
      newTodoContent.value = ''
      showInput.value = false
    })
  }
}

function deleteTodo(id) {
  client.models.Todo.delete({ id })

  // After deleting a todo, update the list of todos
  listTodos()
}

// fetch todos when the component is mounted
onMounted(() => {
  listTodos()
})
</script>
