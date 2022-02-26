import {ref, Ref} from '@nuxtjs/composition-api';
// @ts-ignore damn lodash
import {clone} from 'lodash';
import loggerFactory, {Logger} from '@/utils/logger';

const logger: Logger = loggerFactory.create('UseTodos');

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface UseTodos {
  todos: Ref<Array<Todo>>;
  onTodoToggle: (id: Todo['id']) => void;
  onTodoDeleted: (id: Todo['id']) => void;
  onTodoCreated: (todo: Todo) => void;
  onTodoChanged: (todo: Todo) => void;
}

const getTodos = (): UseTodos => {
  const todos: Ref<Array<Todo>> = ref([]);

  const onTodoCreated = (todo: Todo): void => {
    logger.debug('onTodoCreated, todo', todo);
    todos.value = [...todos.value, todo];
  };

  const onTodoDeleted = (id: Todo['id']): void => {
    todos.value = todos.value.filter(t => t.id !== id);
  };

  const onTodoToggle = (id: Todo['id']): void => {
    const index: number = todos.value.findIndex(t => t.id === id);
    const item: Todo = todos.value[id];
    todos.value = [
      ...todos.value.slice(0, index),
      {
        ...item,
        completed: !item.completed
      },
      ...todos.value.slice(index + 1)
    ];
  };

  const onTodoChanged = (todo: Todo): void => {
    const todosCopy: Array<Todo> = clone([...todos.value]);

    const index: number = todosCopy.findIndex(t => t.id === todo.id);
    todosCopy[index] = {...todosCopy[index], ...todo};
    todos.value = todosCopy;

  };

  return {
    todos,
    onTodoCreated,
    onTodoDeleted,
    onTodoToggle,
    onTodoChanged
  };
};

const todos: UseTodos = getTodos();

export const useTodos = () => todos;
