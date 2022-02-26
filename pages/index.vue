<template>
  <v-row justify="center" align="center">
    <div style="margin-bottom: 10px">
      <TaskCreator :onCreate="onTodoCreated"/>
    </div>

    <div>
      <TaskList
        :todos="todos"
        :changed="onTodoChanged"
        :deleted="onTodoDeleted"
      />
    </div>
  </v-row>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '~/utils/logger';
import TaskCreator from '~/components/TaskCreator.vue';
import TaskList from '~/components/TaskList.vue';
import {useTodos} from '~/hooks/useTodos';

const logger: Logger = loggerFactory.create('index');

export default defineComponent({
  name: 'IndexPage',
  components: {
    TaskCreator,
    TaskList
  },

  setup() {
    const {
      todos,
      onTodoCreated,
      onTodoDeleted,
      onTodoChanged
    } = useTodos();
    // const addTodo2 = () => {
    //   store.commit(_add, 'aaa');
    // };
    //
    // addTodo2();
    //
    // console.log('store.state.todos2', store.state.todos);
    return {
      todos,
      onTodoChanged,
      onTodoDeleted,
      onTodoCreated
    };
  }
});
</script>
