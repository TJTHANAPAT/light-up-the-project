import React, {useContext} from 'react'
import {CounterContext} from './store/CounterProvider'

function App() {
  const { counter, addCounter, subCounter } = useContext(CounterContext)
  console.log(counter)
  return(
    <div>
      <h1>{counter}</h1>
      <button onClick={() => addCounter(1)}>Add</button>
      <button onClick={() => subCounter(1)}>Sub</button>
    </div>
  )
}

export default App