import {ref, Ref} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '@/utils/logger';

const logger: Logger = loggerFactory.create('UseTodos');

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let id = 0;
export const getId = () => {
  id = id + 1;
  logger.debug('id', id);
  return id;
};

export interface UseTodos {
  todos: Ref<Array<Todo>>;
  onTodoToggle: (id: Todo['id']) => void;
  onTodoDeleted: (id: Todo['id']) => void;
  onTodoCreated: (todo: Todo) => void;
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
    const item: Todo = todos.value[index];
    todos.value = [
      ...todos.value.slice(0, index),
      {
        ...item,
        completed: !item.completed
      },
      ...todos.value.slice(index + 1)
    ];
  };

  return {
    todos,
    onTodoCreated,
    onTodoDeleted,
    onTodoToggle
  };
};

const todos: UseTodos = getTodos();

export const useTodos = () => todos;
