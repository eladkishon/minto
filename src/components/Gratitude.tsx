import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { db } from "../firebase";
import { store } from "../store";
import debounce from 'lodash/debounce';

interface Gratitude {
    text: string
}

const exampleGrats = ['Make up the bed', 'Keep learning economics', 'Practice guitar']

const gratsRef = doc(db, "gratitudes", "1");

const gratitudes = atom<Gratitude[]>([
    { text: ''},
    { text: '' },
    { text: ''},
])

const saveGratitudes = debounce(async () => {
    await setDoc(gratsRef, { grats: store.get(gratitudes) }, { merge: true });
}, 300)

store.sub(gratitudes, async () => {
    console.log('Atom state changed to:', store.get(gratitudes));
    saveGratitudes()
});

onSnapshot(gratsRef, (doc) => {
    if (doc.exists() && doc.data().grats.length) {
        console.log("update from firebase ", doc.data())
        store.set(gratitudes, doc.data().grats)
    }
});


export const Gratitudes = () => {
    const [grats] = useAtom(gratitudes)
    const gratsTextInputRefs = useRef<(HTMLTextAreaElement | null)[]>([]); // Create an array of refs

    const handleAddGrat = () => {
        store.set(gratitudes, () => [...grats, { text: '', done: false }])
    };

    const handleDeleteTodo = (index: number) => {
        if (grats.length > 3) {
            const updatedGrats = [...grats]
            updatedGrats.splice(index, 1)
            gratsTextInputRefs.current.splice(index, 1)
            store.set(gratitudes, updatedGrats)
        }

        gratsTextInputRefs.current[gratsTextInputRefs.current.length - 1]?.focus()
    }


    const handleEditGrat = (index: number, val: string) => {
        const updatedGrats = grats.map((todo, i) =>
            i === index ? { ...todo, text: val } : todo
        );
        store.set(gratitudes, updatedGrats)

        if (gratsTextInputRefs.current[index]) {
            gratsTextInputRefs.current[index].style.height = 'auto';
            gratsTextInputRefs.current[index].style.height = `${gratsTextInputRefs.current[index].scrollHeight}px`;
        }
    };

    useEffect(() => {
        gratsTextInputRefs.current[0]?.focus()
    }, [])



    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                {grats.map((todo, index) => (
                    <div className="flex items-center" key={index}>
                        <span className="text-xl font-extrabold w-1/6 text-center"> {index + 1}. </span>
                        <div className="flex gap-1 w-full">
                            <textarea
                                rows={1}
                                className="resize-none w-full"
                                ref={(el) => (gratsTextInputRefs.current[index] = el)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleAddGrat()
                                    if (e.key === 'Backspace') !todo.text && handleDeleteTodo(index)

                                }}
                                placeholder={!todo.text ? index < exampleGrats.length ? exampleGrats[index] : 'I want to accomplish...' : ''}
                                value={todo.text}
                                onChange={(e) => handleEditGrat(index, e.target.value)}
                                autoFocus
                            />
                            {/* {
                                todos.length > 3 && <button onClick={() => handleDeleteTodo(index)}>
                                    <AiOutlineDelete />
                                </button>
                            } */}



                        </div>



                    </div>
                ))}
            </div>

        </div>
    );
};
