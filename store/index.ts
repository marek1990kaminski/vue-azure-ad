import {TodoItem} from '~/types/main';

const add = 'add';
const remove = 'remove';
const toggle = 'toggle';

export interface MainState {
  list: Array<TodoItem>;
}

export const state = (): MainState => ({
  list: []
});

export const mutations = {
  [add](state: MainState, text: string) {
    state.list.push({
      text,
      done: false
    });
  },
  [remove](state: MainState, {todo}: {todo: TodoItem}) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  [toggle](state: MainState, todo: TodoItem) {
    todo.done = !todo.done;
  }
};
