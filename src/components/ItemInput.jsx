import React from 'react'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

function ItemInput(props) {
    return (
        <div className="col-sm-6 mx-auto">

    <InputGroup className="mb-3" >
        <InputGroup.Prepend>
        {/* <InputGroup.Text id="basic-addon1"></InputGroup.Text> */}
        </InputGroup.Prepend>
        <FormControl 
        value={props.input}
        onChange={(e) => props.setinput(e.target.value)}
        placeholder="Type the title you wanna save"
        aria-label="Item"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
            
        </div>
    )
}

export default ItemInput
