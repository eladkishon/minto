import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Card, CardBody, Checkbox } from '@nextui-org/react'
import { atom, useAtom } from 'jotai'
import { db } from './firebase'
import {doc,setDoc, onSnapshot} from 'firebase/firestore'
interface Todo {
  text: string
  done: boolean
}


const todosAtom = atom<Todo[]>([

])

const todosRef = doc(db, "todos", "1");



const TodoList = () => {
  const [todos, setTodos] = useAtom(todosAtom)

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos((todos) => [...todos, { text: newTodo, done: false } ])
      // setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const handleToggleCheckbox = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index: number, val: string) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: val } : todo
    );
    setTodos(updatedTodos);
  };

  const isLocalUpdate = useRef(false);  // Flag to prevent infinite loop

  useEffect(() => {
    try {

    const unsubscribe = onSnapshot(todosRef, (doc) => {
      if (doc.exists() && !isLocalUpdate.current) {
        // Only update state if it's not a local update
        // console.log(doc.data())
        setTodos(doc.data().todos);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }
    catch(err) {
      console.log(err)
    }
  }, []); // Empty array to run this effect only once when component mounts


  useEffect(() => {
    const updateFirestore = async () => {
      try {
        if (!isLocalUpdate.current) {
          isLocalUpdate.current = true; 
          await setDoc(todosRef, {todos}, { merge: true });
          console.log("Firestore updated successfully");
        }
      } catch (error) {
        console.error("Error updating Firestore: ", error);
      } finally {
        // Reset the local update flag after Firestore update completes
        isLocalUpdate.current = false;
      }
    };

    // Update Firestore only if data is not empty
    if (Object.keys(todos).length > 0) {
      updateFirestore();
    }
  }, [todos]);


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
