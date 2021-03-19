import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';


function ItemUpdate(props) {
    const [input, setinput] = useState(props.title)

    return (
        <div>
           <input value={input} onChange={(e) => setinput(e.target.value)}></input>
            <div>
                <Button size='sm' onClick={() => {
                    props.onUpdate({id:props.id, title: input})
                    props.onCancel(0)
                    }}  > save </Button>{' '}
                <Button size='sm' onClick={() => props.onCancel(0)}> cancel </Button>

            </div>
            
        </div>
    )
}

export default ItemUpdate
