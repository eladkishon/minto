import './App.css'
import { Card, CardBody } from '@nextui-org/react'
import { Todos } from './Todos'




function App() {


  return (
    <div className="flex flex-col justify-center items-center h-full">
        <Card className='p-10'>
          <CardBody >
            <Todos />
          </CardBody>
        </Card>
    </div>







  )
}

export default App
