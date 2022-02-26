<template>
  <v-container>

    <v-list dense max-width="600px" class="mx-auto">
      <v-list-item
        v-for="(todo) in todos"
        id="taskContainer"
        :key="todo.id"
      >

        <v-list-item-content class="mr-4">
          <v-chip
            :class="`chip ${todo.completed ? 'text-decoration-line-through':''}`"
            large
            @click.stop="onTodoToggle(todo.id)"
          >
            {{ todo.text }}
          </v-chip>
        </v-list-item-content>

        <v-btn
          color="red"
          @click.prevent="onTodoDeleted(todo.id)"
        >
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
      onTodoToggle,
      todos
    } = useTodos();

    return {
      todos,
      onTodoDeleted,
      onTodoToggle
    };
  }

});
</script>

<style scoped>

.chip:hover {
  cursor: pointer;
}
</style>
