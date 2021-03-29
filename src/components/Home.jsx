import React, { useState , useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import ItemInput from './ItemInput'
import CardDisplay from './CardDisplay'
import Spinner from 'react-bootstrap/Spinner'
import './Home.css'


function Home() {
    
    const [getList, setgetList] = useState(1)
    const [dataFromServer, setdataFromServer] = useState(null)
    const [input, setinput] = useState('')
    const [newItem,setnewItem] = useState(null)
    const [updateItem,setupdateItem] = useState(null)
    const [deleteItem, setdeleteItem] = useState(null)
    const [loading, setloading] = useState(0)
    let user = 'myUser'

    useEffect(() => {
        
        if(getList){
            console.log('useEffect display list run')
            fetch('/list')
            .then(response => response.json())
            .then(data => {
                // console.log(data[0]._id)
                setdataFromServer(data)})
            .catch(error => console.error('Error:', error))
        setgetList(0)
        }
        
    }, [getList])

    useEffect(() => {
        
        if(newItem){
            console.log('useEffect add item run')

            fetch('/db', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem),
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data)
            })
            .catch(error => console.error('Error:', error))
            setinput('')
            setgetList(1)
            setnewItem(null)
        }
        // else{
        //     console.log('no data to send to server')
        // }

    }, [newItem])
    
    useEffect(() => {
        if(updateItem){
            console.log('useEffect update item run')
            setloading(1)
            fetch(`/update${updateItem.id}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateItem),
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data)
                setloading(0)
            })
            .catch(error => console.error('Error:', error))
            setinput('')
            setgetList(1)
            setupdateItem(null)
        }
        // else{
        //     console.log('no data to send to server')
        // }

    }, [updateItem])


    useEffect(() => {
        if(deleteItem){
            console.log('useEffect delete Item run')
            fetch(`/list${deleteItem}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    console.log('deleted')
                })
                .catch(error => console.error('Error:', error))
        setgetList(1)       
        }
     
    }, [deleteItem])


    return (
        <div>
            <div className='darkDiv'>
           <h2 > data from server  </h2> 
           {/* <input value={input} onChange={(e) => setinput(e.target.value)}></input> */}
           <ItemInput input={input} setinput={setinput} ></ItemInput>
          
            <div className='button'>
           <Button variant="light" onClick={() => setnewItem({'user': user, 'title': input, 'type': 'track'})} > TRACK </Button>{' '}
           <Button variant="light" onClick={() => setnewItem({'user': user, 'title': input, 'type': 'book'})} > BOOK </Button>{' '}
           <Button variant="light" onClick={() => setnewItem({'user': user, 'title': input, 'type': 'movie'})} > MOVIE </Button>{' '}
           <Button variant="light" onClick={() => setnewItem({'user': user, 'title': input, 'type': 'tag'})} > TAG </Button>{' '}
            </div>
            </div>

            <div>
                {loading? <Spinner animation="border" variant="warning" /> : ''}
            </div>
            
            <div className='displayItemDiv'>
            {dataFromServer? dataFromServer.map((e, i) => { return <CardDisplay 
            key={i}
            title={e.title}
            type={e.type}
            createdAt={e.createdAt}
            id={e._id}
            onDelete={setdeleteItem}
            onUpdate={setupdateItem}
            input={input}

            ></CardDisplay>})
            :   <Spinner animation="border" variant="warning" />  }
            </div>

            <div>
                -       
            </div>
            
        </div>
    )
}

export default Home
