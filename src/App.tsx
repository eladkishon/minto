import './App.css'
import { Card, CardBody, useDisclosure } from '@nextui-org/react'
import { Todos } from './Todos'
import { MusicSwitch } from './components/MusicSwitch';
import { PiGearFineBold } from "react-icons/pi";
import { bellAtom, Settings } from './components/Settings';
import { FaRegBell } from "react-icons/fa6";
import { useAtomValue } from 'jotai';
import { Bell } from './components/Bell';






function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4  w-full md:w-1/3 mx-auto px-4">
      <Settings isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className='flex w-full justify-end gap-2 items-center'>
        <Bell/>
        <MusicSwitch />
        <a href='javascript:void(0)' onClick={onOpen}><PiGearFineBold size={25}/></a>
      </div>

      <Card className='w-full'>
        <CardBody className='p-10'>
          <Todos />
        </CardBody>
      </Card>
    </div>







  )
}

export default App
