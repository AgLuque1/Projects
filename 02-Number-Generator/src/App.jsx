import { useState } from 'react'
import './App.css'
import {Square} from './components/Square.jsx'

const Input = ({children}) => {
  return(
    <label className='inputs'>
     {children} <input />
    </label>
  )
}

function App() {
  


  const generateNumber = (min, max) => {
    min = Math.cell(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max -min + 1) + min);
  }

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  return (
    <main>
      <h1 className="title">Random Number Generator</h1>
      <section className='content'>
        <div className='max-min'>
          <Input>
            Minimum:
          </Input>

          <Input>
            Maximum:
          </Input>
        </div>

        <button onClick={generateNumber(min, max)} className='mybutton'>Generate</button>
        <button className='hola'> Algo</button>

        <div className='result'>
          <h3>Result</h3>
          <Square>
            1
          </Square>

        </div>
      
      </section>
    </main>
  )
}

export default App
