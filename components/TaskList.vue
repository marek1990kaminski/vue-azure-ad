<template>
  <v-container>

    <v-list dense max-width="500px" class="mx-auto">
      <v-list-item
        v-for="(todo) in todos"
        id="taskContainer"
        :key="todo.id"
      >

        <v-list-item-content> {{ todo.text }}</v-list-item-content>
        <v-btn @click.prevent="onTodoDeleted(todo.id)">
          Delete
        </v-btn>
      </v-list-item>

    </v-list>
  </v-container>
</template>

<script lang="ts">

import {defineComponent} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '@/utils/logger';
import {useTodos} from '@/hooks/useTodos';

const logger: Logger = loggerFactory.create('TaskList');

export default defineComponent({
  name: 'TaskList',
  props: {},
  setup() {
    const {
      onTodoDeleted,
      todos
    } = useTodos();

    return {
      todos,
      onTodoDeleted
    };
  }

});
</script>

<style scoped>

</style>
