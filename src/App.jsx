import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charallowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 

    if (numberAllowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charallowed])

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charallowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          text="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>
          Copy
        </button>

      </div>
      <div className='flex items-center gap-x-1'>
        <div className='flex items-center gap-x-1'>
          <input 
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)  => setLength(e.target.value)}
          />
          <label htmlFor='length'>Length: {length}</label> 
        </div>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
          className=''
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
        />
        <label htmlFor='number'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
          className=''
          type='checkbox'
          defaultChecked={charallowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
        />
        <label htmlFor='characters'>Characters</label>
      </div>
    </div>
  )
}

export default App
