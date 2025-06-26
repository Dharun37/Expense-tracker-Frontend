import React from 'react'
import "./Style.css"
import {useState} from 'react'
function Index() {
  const [data , setdata] = useState("")
  return (
    <div>
    <h1>hello {data}</h1>
    <button onClick={()=>setdata("hii")}>Click</button>
    </div>
  )
}
export default Index