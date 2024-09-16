import './App.css'
import { Button, Card, CardBody, CardFooter, CardHeader, useDisclosure } from '@nextui-org/react'
import { MusicSwitch } from './components/MusicSwitch';
import { PiGearFineBold } from "react-icons/pi";
import { Settings } from './components/Settings';
import { Bell } from './components/Bell';
import { useState } from 'react';
import { Gratitudes } from './components/Gratitude';
import { Todos } from './components/Todos';

const PHASE_GRATITUDE = 'gratitude'
const PHASE_TODO = 'todo'


const PHASES = [PHASE_GRATITUDE, PHASE_TODO]


function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [phase, setPhase] = useState(0)

  function changePhage(newPhase): void {
    setPhase(newPhase)
  }

  return (
    <div className="flex flex-col my-2 md:my-0 md:justify-center items-center h-full gap-4  w-full md:w-2/3 mx-auto px-4">
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



      <Card className='w-full h-2/3'>


        {PHASES[phase] == PHASE_TODO && <>
          <CardHeader className='p-6'>
            <p className='text-3xl font-extrabold'>Accomplishments Today</p>
          </CardHeader>
          <CardBody className='px-2 md:px-10  flex flex-col gap-4'>
            <Todos />
          </CardBody>
        </>}

        {PHASES[phase] == PHASE_GRATITUDE && <>
          <CardHeader className='p-6'>
            <p className='text-3xl font-extrabold'>Gratitude</p>
          </CardHeader>

          <CardBody className='px-2 md:px-10 flex flex-col gap-4'>
            <Gratitudes />
          </CardBody>

        </>}

        <CardFooter className='flex w-full' >
          <div className='flex w-full '>
            {phase > 0 && <Button variant='light' onClick={() => changePhage(phase - 1)}>Back</Button>}
          </div>
          <div className='flex justify-end w-full'>
            {phase < PHASES.length - 1 && <Button variant='light' onClick={() => changePhage(phase + 1)}>Done</Button>}
          </div>
        </CardFooter>
      </Card>



    </div>







  )
}

export default App
