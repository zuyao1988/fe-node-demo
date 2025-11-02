import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../App";

type Todo = {
  id: number;
  text: string;
};

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on first render
    const saved = localStorage.getItem("todos");
    console.log(`saved: ${saved}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [task, setTask] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useContext(ThemeContext);

  // Load todos from localStorage on first render
  useEffect(() => {
    const xx = localStorage.getItem("todos");
    console.log(`xx: ${xx}`);
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    console.log(`saved: ${saved}`);
    setTodos(saved);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    console.log(`todos: ${JSON.stringify(todos)}`);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task }]);
    setTask("");
    inputRef.current?.focus(); // useRef to focus input again
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">Todo List</h1>

      <div className="flex mb-4">
        <input
          ref={inputRef}
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-2 rounded-l-xl border"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-r-xl"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-xl"
          >
            <span>{todo.text}</span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
