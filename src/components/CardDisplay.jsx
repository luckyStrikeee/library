import React, { useState } from 'react'
import ItemUpdate from './ItemUpdate'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

function CardDisplay(props) {
    const [updateClicked, setupdateClicked] = useState(0)
    let updateInput
    
    if (updateClicked) {
        updateInput = <ItemUpdate title={props.title} id={props.id} onUpdate={props.onUpdate} onCancel={setupdateClicked}></ItemUpdate>
    }
    else {
        updateInput = null
    }

    return (
        <div className="col-sm-6 mx-auto">
            <Card>
            {/* <Card.Header>{props.type}</Card.Header> */}
            <Card.Body>
                <Card.Title>{props.title} <Badge pill variant="warning">{props.type}</Badge></Card.Title>
                {/* <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text> */}
                <Button variant="danger" size='sm' onClick={() => props.onDelete(props.id)}>Delete</Button>{' '}
                <Button variant="info" size='sm' onClick={() => setupdateClicked(1)}>Update</Button>
                {updateInput}
            </Card.Body>
            </Card>
            
        </div>
    )
}

export default CardDisplay
