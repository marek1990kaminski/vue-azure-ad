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
            clearable
          />
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
import {getId, useTodos} from '~/hooks/useTodos';

const logger: Logger = loggerFactory.create('TaskCreator');

export default defineComponent({
  name: 'TaskCreator',
  setup() {

    const todoText: Ref<string> = ref('');
    const {onTodoCreated} = useTodos();

    const onSubmit = () => {

      if (todoText.value !== '') {
        onTodoCreated(
          {
            id: getId(),
            text: todoText.value,
            completed: false
          }
        );
      }

    };

    const taskRules = [
      (v: string) => !!v || 'task text is required'
    ];

    return {
      todoText,
      onSubmit,
      taskRules
    };
  }
});
</script>

<style scoped>

</style>
