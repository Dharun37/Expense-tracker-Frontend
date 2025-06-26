import React, { useState } from 'react'
function loginform(){
    const [data,setdata]=useState("")
    const [data2,setdata2]=useState("")
}
function submit(e) {
    e.preventDefault()
    setdata2(data)
}
  return (
    <div>
        <form onSubmit={submit}>
            <input type='text' value={data}
            onChange={(e)=>setdata(e.target.value)}/>
            <button>Click</button>

        </form>
        <p>{data}</p>
    </div>
  )
export default Form