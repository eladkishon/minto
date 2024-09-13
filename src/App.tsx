import { useState } from 'react'
import './App.css'
import { Card, CardBody, Checkbox, Input } from '@nextui-org/react'


const NewToDo = () => {
  return  <Input
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          // "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],

      }}
      placeholder="Type to search..."

    />
}

function App() {

  const [todos, setTodos] = useState(["hello", "esh"])

  return (
    <div className="flex flex-col items-center h-full">
      <div className='mt-20'>
      <Card className='p-10'>
        <CardBody >

          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-2'>
              {todos.map((todo) => {
                return <div className='flex flex-row'>
                  <Checkbox />
                  <h1>{todo}</h1>

                </div>
              })}
            </div>

            <div className='flex'>
              <NewToDo />
            </div>

          </div>
        </CardBody>
      </Card>

      </div>



    </div>







  )
}

export default App
