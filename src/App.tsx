import { useState } from 'react'
import './App.css'
import { Card, CardBody, Checkbox } from '@nextui-org/react'

interface Todo {
  text: string
  done: boolean
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const handleToggleCheckbox = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index: number, val: string) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: val } : todo
    );
    setTodos(updatedTodos);
  };



  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        {todos.map((todo, index) => (
          <div key={index}>
            <Checkbox
              isSelected={todo.done}
              onChange={() => handleToggleCheckbox(index)}
            >

            </Checkbox>
            <input
              value={todo.text}
              onChange={(e) => handleEditTodo(index, e.target.value)}
              autoFocus
            />

          </div>
        ))}
      </div>
      <input
        placeholder="Add a task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onBlur={handleAddTodo}
      />
    </div>
  );
};

function App() {


  return (
    <div className="flex flex-col items-center h-full">
      <div className='mt-20'>
        <Card className='p-10'>
          <CardBody >


            <TodoList />

          </CardBody>
        </Card>


      </div>



    </div>







  )
}

export default App
