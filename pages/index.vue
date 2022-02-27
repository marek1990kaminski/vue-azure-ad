<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-card-title>
      Todo List
    </v-card-title>

    <v-row justify="center" align="center">
      <TaskCreator :onCreate="onTodoCreated"/>
    </v-row>

    <v-row justify="center" align="center">
      <TaskList
        :todos="todos"
        :done="onTodoToggle"
        :deleted="onTodoDeleted"
      />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '~/utils/logger';
import TaskCreator from '~/components/TaskCreator.vue';
import TaskList from '~/components/TaskList.vue';
import {useTodos} from '~/hooks/useTodos';

const name = 'IndexPage';

const logger: Logger = loggerFactory.create(name);

export default defineComponent({
  name,
  components: {
    TaskCreator,
    TaskList
  },
  mixins: [],
  setup() {

    const {
      todos,
      onTodoCreated,
      onTodoDeleted,
      onTodoToggle
    } = useTodos();

    return {
      todos,
      onTodoToggle,
      onTodoDeleted,
      onTodoCreated
    };
  }
});
</script>
