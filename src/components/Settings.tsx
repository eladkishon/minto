import { db } from "@/firebase";
import { store } from "@/store";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import debounce from "lodash/debounce";
import { useState, useMemo, useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";


const BELL_CALM = 'calm'
const BELL_WAKUP = 'wakeup'

export const BellsConfig = {
    [BELL_CALM]: {
        title: 'Calm',
        path: '/bell1.mp3'
    },
    [BELL_WAKUP]: {
        title: 'Wake up',
        path: '/bell2.mp3',
    }
}

export const bellAtom = atom(BELL_CALM)

const settingsRef = doc(db, "settings", "1");

onSnapshot(settingsRef, (doc) => {
    if (doc.exists()) {

        console.log("update from firebase ", doc.data())
        if (doc.data().bell) {
            store.set(bellAtom, doc.data().bell)
        }
    }
});

const saveSetting = debounce(async (settings) => {
    await setDoc(settingsRef, settings, { merge: true });
    console.log("saved setting")
}, 300)


store.sub(bellAtom, () => {
    saveSetting({ bell: store.get(bellAtom) })
})




const BellSetting = () => {

    const [bell, setBell] = useAtom(bellAtom)

    const [selectedKeys, setSelectedKeys] = useState(new Set([bell]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    useEffect(() => {
        setBell(selectedValue)
    }, [selectedValue])

    return <Dropdown>
        <DropdownTrigger>
            <Button
                variant="light"
            >
                <FaRegBell size={20} />
                {BellsConfig[selectedValue].title}
            </Button>
        </DropdownTrigger>
        <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys as any}
        >
            {
                Object.keys(BellsConfig).map((key) => {
                    return <DropdownItem key={key}>{BellsConfig[key].title}</DropdownItem>
                })
            }

        </DropdownMenu>
    </Dropdown>
}

export const Settings = ({ isOpen, onOpenChange }) => {

    return <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
    >
        <ModalContent>
            {(_) => (
                <>
                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                    <ModalBody>

                        <div className="flex flex-col gap-4 p-4 w-2/3 mx-auto">

                            <BellSetting />
                        </div>


                    </ModalBody>

                </>
            )}
        </ModalContent>
    </Modal>
}