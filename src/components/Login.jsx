import React, { useState } from 'react'

function Login(props) {
    const [input, setinput] = useState(null)

    let logout = <div>
        <input onChange={e => setinput(e.target.value)} placeholder='Enter your email'></input>
        <button onClick={() => {
            props.setuser(input)
            props.setgetList(!props.getList)
            }}> Login </button>
    </div>

    let login = <div>
        <span>{props.user}</span><br></br>
        <button onClick={() =>{
            props.setuser(null)
            props.setgetList(!props.getList)
            }}> Logout </button>
    </div>

    return (
        <div>
            {props.user ? login : logout}
        </div>
    )
}

export default Login
