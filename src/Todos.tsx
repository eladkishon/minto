import { Checkbox } from "@nextui-org/react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { db } from "./firebase";
import { IoRemove } from "react-icons/io5";
import { store } from "./store";
import debounce from 'lodash/debounce';

interface Todo {
    text: string
    done: boolean
}

const todosRef = doc(db, "todos", "1");

const todosAtom = atom<Todo[]>([
])

const saveTodos = debounce(async () => {
    await setDoc(todosRef, { todos: store.get(todosAtom) }, { merge: true });
}, 300)

store.sub(todosAtom, async () => {
    console.log('Atom state changed to:', store.get(todosAtom));
    saveTodos()
});

onSnapshot(todosRef, (doc) => {
    if (doc.exists()) {

        console.log("update from firebase ", doc.data())
        store.set(todosAtom, doc.data().todos)
    }
});


export const Todos = () => {
    const [todos] = useAtom(todosAtom)
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
                            todo.done && <button onClick={() => handleDeleteTodo(index)}>
                                <IoRemove />
                            </button>
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
