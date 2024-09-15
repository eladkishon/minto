import './App.css'
import { Card, CardBody, useDisclosure } from '@nextui-org/react'
import { Todos } from './Todos'
import { MusicSwitch } from './components/MusicSwitch';
import { PiGearFineBold } from "react-icons/pi";
import { Settings } from './components/Settings';
import { Bell } from './components/Bell';



function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col my-2 md:my-0 md:justify-center items-center h-full gap-4  w-full md:w-1/3 mx-auto px-4">
      <Settings isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className='flex w-full'>
        <div className='w-full flex justify-end'>
          <button onClick={onOpen}><PiGearFineBold size={25} /></button>
        </div>
      </div>
      <div className='flex w-full justify-end gap-2 items-center'>
        <div className='flex justify-center w-full items-center gap-2'>
          <Bell />
          <MusicSwitch />
        </div>

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
