import './App.css'
import { Card, CardBody } from '@nextui-org/react'
import { Todos } from './Todos'
import { MusicSwitch } from './components/MusicSwitch';






function App() {


  return (
    <div className="flex flex-col justify-center items-center h-full gap-4  w-full md:w-1/3 mx-auto px-4">

    <div className='flex w-full justify-end'>
      <MusicSwitch/>
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
