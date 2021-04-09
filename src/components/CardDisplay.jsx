import React, { useState } from 'react'
import ItemUpdate from './ItemUpdate'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './CardDisplay.css'

function CardDisplay(props) {
    const [updateClicked, setupdateClicked] = useState(0)
    const [setupClicked, setsetupClicked] = useState(false)

    let updateInput
    let setupButton
    
    if (updateClicked) {
        updateInput = <ItemUpdate 
        title={props.title} 
        id={props.id} 
        onUpdate={props.onUpdate} 
        onCancel={setupdateClicked}
        >
        

        </ItemUpdate>
    }
    else {
        updateInput = null
    }

    if(setupClicked) {
        setupButton = <div>
            <Button variant="danger" size='sm' onClick={() => props.onDelete(props.id)}>Delete</Button>{' '}
            <Button variant="info" size='sm' onClick={() => setupdateClicked(1)}>Update</Button>
        </div>
    } else {
        setupButton = null
    }

    return (
        <div>
            <Card className="cardDiv">
            {/* <Card.Header>{props.type}</Card.Header> */}
            
            <Card.Body className='cardBody'>
                
                <Card.Title className='title' onClick={() => setsetupClicked(!setupClicked)}> {props.title}
                
                </Card.Title> <span className='badge'>{props.type}</span>
                {/* <Badge className='badge' pill variant="warning">{props.type}</Badge> */}
                {/* <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text> */}
                {/* <Button variant="danger" size='sm' onClick={() => props.onDelete(props.id)}>Delete</Button>{' '}
                <Button variant="info" size='sm' onClick={() => setupdateClicked(1)}>Update</Button> */}
                {setupButton}
                {updateInput}
            </Card.Body>
            </Card>
            
        </div>
    )
}

export default CardDisplay
