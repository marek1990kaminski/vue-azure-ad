<template>

  <v-form
    v-model="valid"
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

import {defineComponent, PropType, Ref, ref} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '@/utils/logger';
import {UseTodos} from '@/hooks/useTodos';

const logger: Logger = loggerFactory.create('TaskCreator');

let id = 0;
const getId = () => id++;

export default defineComponent({
  name: 'TaskCreator',
  props: {
    onCreate: {
      type: Function as PropType<UseTodos['onTodoCreated']>,
      required: true
    }

  },
  setup(props) {

    const todoText: Ref<string> = ref('');

    const onchange = (event: any): void => {
      logger.debug('event', event);
    };

    const valid: Ref<boolean> = ref(true);
    const onSubmit = () => {
      logger.debug('onSubmit!!!', {
        id: getId(),
        text: todoText,
        completed: false
      });

      if (todoText.value !== '') {
        props.onCreate(
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
      taskRules,
      valid: true
    };
  }
});
</script>

<style scoped>

</style>
