import { Checkbox } from "@nextui-org/react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { db } from "./firebase";
import { IoRemove } from "react-icons/io5";
import { store } from "./store";
import debounce from 'lodash/debounce';

interface Todo {
    text: string
    done: boolean
}

const exampleTodos = ['Make up the bed', 'Keep learning economics', 'Practice guitar']

const todosRef = doc(db, "todos", "1");

const todosAtom = atom<Todo[]>([
    { text: '', done: false },
    { text: '', done: false },
    { text: '', done: false },
])

const saveTodos = debounce(async () => {
    await setDoc(todosRef, { todos: store.get(todosAtom) }, { merge: true });
}, 300)

store.sub(todosAtom, async () => {
    console.log('Atom state changed to:', store.get(todosAtom));
    saveTodos()
});

onSnapshot(todosRef, (doc) => {
    if (doc.exists() && doc.data().todos.length) {
        console.log("update from firebase ", doc.data())
        store.set(todosAtom, doc.data().todos)
    }
});


export const Todos = () => {
    const [todos] = useAtom(todosAtom)
    const todoTextInputRefs = useRef<(HTMLInputElement | null)[]>([]); // Create an array of refs

    const handleAddTodo = () => {
        store.set(todosAtom, () => [...todos, { text: '', done: false }])
    };

    const handleDeleteTodo = (index: number) => {
        if (todos.length > 3) {
            const updatedTodos = [...todos]
            updatedTodos.splice(index, 1)
            todoTextInputRefs.current.splice(index, 1)
            store.set(todosAtom, updatedTodos)
            console.log(todoTextInputRefs)
        }

        todoTextInputRefs.current[todoTextInputRefs.current.length - 1]?.focus()
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

    useEffect(()=> {
        todoTextInputRefs.current[0]?.focus()
    }, [])



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
                            ref={(el) => (todoTextInputRefs.current[index] = el)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddTodo()
                                if (e.key === 'Backspace') handleDeleteTodo(index)

                            }}
                            placeholder={!todo.text? index < exampleTodos.length? exampleTodos[index]: 'I want to accomplish...' :''}
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
            {/* <input
                placeholder="Add a task"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onBlur={handleAddTodo}
            /> */}
        </div>
    );
};
