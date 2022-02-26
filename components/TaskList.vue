<template>
  <div>
    <div
      v-for="(todo) in todos"
      id="taskContainer"
      :key="todo.id"
    >
      {{ todo.text }}
      <button @click.prevent="getOnDelete(todo.id)">
        Delete
      </button>
    </div>
  </div>

</template>

<script lang="ts">

import {defineComponent, PropType} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '@/utils/logger';
import {Todo, UseTodos} from '@/hooks/useTodos';

const logger: Logger = loggerFactory.create('TaskList');

export default defineComponent({
  name: 'TaskList',
  props: {
    todos: {
      required: true,
      type: Array as PropType<Array<Todo>>
    },
    changed: {
      required: true,
      type: Function as PropType<UseTodos['onTodoChanged']>
    },
    deleted: {
      required: true,
      type: Function as PropType<UseTodos['onTodoDeleted']>
    }
  },
  setup(props) {

    const getOnDelete = (id: Todo['id']) => {
      props.deleted(id);
    };

    return {
      getOnDelete
    };
  }

});
</script>

<style scoped>
#taskContainer {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
