import React, { useState , useEffect} from 'react'
import ListDisplay from './listDisplay'
import Button from 'react-bootstrap/Button'
import ItemInput from './ItemInput'
import CardDisplay from './CardDisplay'


function Home() {
    
    const [getList, setgetList] = useState(1)
    const [dataFromServer, setdataFromServer] = useState([{}])
    const [input, setinput] = useState('')
    const [newItem,setnewItem] = useState(null)
    const [updateItem,setupdateItem] = useState(null)
    const [deleteItem, setdeleteItem] = useState(null)
    let user = 'myUser'
    let dis = 'disabled'

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
            <div>
           <h2> data from server  </h2> 
           {/* <input value={input} onChange={(e) => setinput(e.target.value)}></input> */}
           <ItemInput input={input} setinput={setinput} ></ItemInput>
          
            </div>

            <div>
           <Button onClick={() => setnewItem({'user': user, 'title': input, 'type': 'track'})} variant="outline-primary"> track </Button>{' '}
           <Button onClick={() => setnewItem({'user': user, 'title': input, 'type': 'book'})} variant="outline-primary"> book </Button>{' '}
           <Button onClick={() => setnewItem({'user': user, 'title': input, 'type': 'movie'})} variant="outline-primary"> movie </Button>{' '}
           <Button onClick={() => setnewItem({'user': user, 'title': input, 'type': 'tag'})} variant="outline-primary"> tag </Button>{' '}
           
            </div>
            <div>
                -
            </div>
            
            <div>     
            {dataFromServer.map((e, i) => { return <CardDisplay 
            key={i}
            title={e.title}
            type={e.type}
            createdAt={e.createdAt}
            id={e._id}
            onDelete={setdeleteItem}
            onUpdate={setupdateItem}
            input={input}

            ></CardDisplay>})}
            </div>

            {/* <div>     
            {dataFromServer.map((e, i) => { return <ListDisplay 
            key={i}
            title={e.title}
            type={e.type}
            createdAt={e.createdAt}
            id={e._id}
            onDelete={setdeleteItem}
            onUpdate={setupdateItem}
            input={input}

            ></ListDisplay>})}
            </div> */}
            <div>
                -            
            </div>
            
        </div>
    )
}

export default Home
