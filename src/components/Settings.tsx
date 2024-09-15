import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { atom, useAtom } from "jotai";
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

const Bell = () => {

    const [bell, setBell] = useAtom(bellAtom)

    const [selectedKeys, setSelectedKeys] = useState(new Set([bell]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
      );

    useEffect( () =>{
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
            onSelectionChange={setSelectedKeys}
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
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                    <ModalBody>

                        <div className="flex flex-col gap-4 p-4 w-2/3 mx-auto">

                            <Bell />
                        </div>


                    </ModalBody>

                </>
            )}
        </ModalContent>
    </Modal>
}