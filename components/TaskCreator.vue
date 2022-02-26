<template>

  <v-form
    @submit.prevent="onSubmit"
  >
    <v-container>

      <v-row justify="center" align="center">

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="todoText"
            :rules="taskRules"
            label="Task text"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-btn
            block
            type="submit"
            color="purple"
          >
            ADD
          </v-btn>
        </v-col>

      </v-row>

    </v-container>

  </v-form>

</template>

<script lang="ts">

import {defineComponent, Ref, ref} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '@/utils/logger';
import {useTodos} from '~/hooks/useTodos';

const logger: Logger = loggerFactory.create('TaskCreator');

let id = 0;
const getId = () => id++;

export default defineComponent({
  name: 'TaskCreator',
  setup() {

    const todoText: Ref<string> = ref('');

    const {onTodoCreated} = useTodos();

    const onchange = (event: any): void => {
      logger.debug('event', event);
    };

    const onSubmit = () => {
      logger.debug('onSubmit!!!', {
        id: getId(),
        text: todoText,
        completed: false
      });

      if (todoText.value !== '') {
        onTodoCreated(
          {
            id: getId(),
            text: todoText.value,
            completed: false
          }
        );
        todoText.value = '';
      }

    };

    const taskRules = [
      (v: string) => !!v || 'task text is required'
    ];

    return {
      onchange,
      todoText,
      onSubmit,
      taskRules
    };
  }
});
</script>

<style scoped>

</style>
