import { reactive, toRefs } from 'vue';
export default function () {
  const data = reactive({
    todo: null,
    todos: [],
  });
  const addUser = () => {
    if (data.todo.lenght > 1) {
      data.todos.push(data.todo);
    }
    data.todo = null;
  };
}
