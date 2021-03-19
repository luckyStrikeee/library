import React, { useState } from 'react'
import ItemUpdate from './ItemUpdate'
import Button from 'react-bootstrap/Button'



function ListDisplay(props) {
    const [updateClicked, setupdateClicked] = useState(0)
    let updateInput
    
    if (updateClicked) {
        updateInput = <ItemUpdate title={props.title} id={props.id} onUpdate={props.onUpdate} onCancel={setupdateClicked}></ItemUpdate>
    }
    else {
        updateInput = null
    }

    return (
        <div>
            <p> {props.title} ({props.type}) </p> 
            <Button onClick={() => props.onDelete(props.id)}>delete</Button>{' '}  
            <Button onClick={() => setupdateClicked(1)}>update </Button>            
            {updateInput}

        </div>
    )
}

export default ListDisplay
