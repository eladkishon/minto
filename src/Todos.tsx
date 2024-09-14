import { Button, Checkbox } from "@nextui-org/react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { atom, createStore, useAtom, useAtomValue } from "jotai";
import { useState, useRef, useEffect } from "react";
import { db } from "./firebase";
import { IoRemove } from "react-icons/io5";
import { todo } from "node:test";
import { store } from "./store";

interface Todo {
    text: string
    done: boolean
}

const todosRef = doc(db, "todos", "1");

const todosAtom = atom<Todo[]>([
])

store.sub(todosAtom, async () => {
    console.log('Atom state changed to:', store.get(todosAtom));
    await setDoc(todosRef, { todos: store.get(todosAtom) }, { merge: true });

});

onSnapshot(todosRef, (doc) => {
    if (doc.exists()) {
      
        console.log("update from firebase ", doc.data())
        store.set(todosAtom, doc.data().todos)
    }
});


export const Todos = () => {
    const [todos, setTodos] = useAtom(todosAtom)
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            store.set(todosAtom, () => [...todos, { text: newTodo, done: false }])
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (index: number) => {
        const updatedTodos = [...todos]
        updatedTodos.splice(index, 1)
        store.set(todosAtom, updatedTodos)
    }

    const handleToggleCheckbox = (index: number) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, done: !todo.done } : todo
        );
        store.set(todosAtom, updatedTodos)
    };

    const handleEditTodo = (index: number, val: string) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, text: val } : todo
        );
        store.set(todosAtom, updatedTodos)
    };

   

    return (
        <div className='flex flex-col gap-4'>
            {/* {JSON.stringify(todos)} */}
            <div className='flex flex-col gap-2'>
                {todos.map((todo, index) => (
                    <div className="flex items-center" key={index}>
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
                        {
                            todo.done && <a href="javascript:void(0)" onClick={() => handleDeleteTodo(index)}>
                                <IoRemove />
                            </a>
                        }



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
