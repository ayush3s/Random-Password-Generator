import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [nums, setNum] = useState(false)
  const [chars, setChars] = useState(false)
  const [password, setPassword] = useState("")
  //useref hook:-
  const passwordref=useRef(null)

  const passwordGenerator=useCallback(()=>
    {
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(nums) str+="0123456789"
      if(chars) str+="!@#$%^&*(){}[]+-"
      for(let i=1;i<=length;i++)
      {
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
      }
      setPassword(pass)
    },[length,nums,chars,setPassword])

    const copyPasswordToClipboard=useCallback(()=>{
      passwordref.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])


    useEffect(()=>{
      passwordGenerator();
    },[length,nums,chars,passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
      <input type="text" value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}
      />
      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy
      </button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>
      <div>
      <input
      type="checkbox"
      defaultChecked={setNum}
      id="numberInput"
      onChange={()=>{
        setNum((prev)=>!prev);
      }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div>
      <input
      type="checkbox"
      defaultChecked={setChars}
      id="characterInput"
      onChange={()=>{
        setChars((prev)=>!prev);
      }}
      />
      <label htmlFor="characterInput">characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
