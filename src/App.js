import { useState, useRef } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    // todosをコピー
    const newTodos = [...todos];
    // idが等しければ
    const todo = newTodos.find((todo) => todo.id === id);
    // check状態の入れ替え
    todo.compleated = !todo.compleated;
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.compleated);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={ handleAddTodo }>タスクを追加</button>
      <button onClick={ handleClear }>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.compleated).length}</div>
    </>
  );
}

export default App;
