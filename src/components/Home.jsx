import React, { useState , useEffect} from 'react'
import ItemInput from './ItemInput'
import CardDisplay from './CardDisplay'
import Spinner from 'react-bootstrap/Spinner'
import './Home.css'
import Login from './Login'


function Home() {
    
    const [getList, setgetList] = useState(1)
    const [dataFromServer, setdataFromServer] = useState(null)
    const [input, setinput] = useState('')
    const [newItem,setnewItem] = useState(null)
    const [updateItem,setupdateItem] = useState(null)
    const [deleteItem, setdeleteItem] = useState(null)
    const [loading, setloading] = useState(0)
    const [filterType, setfilterType] = useState(null)
    const [loginInput, setloginInput] = useState(null)
    const [user, setuser] = useState('myUser')
    const itemType = ['track', 'book', 'movie', 'tag']

    useEffect(() => {
        
        if(getList){
            console.log('useEffect display list run')
            fetch(`/list${user}`)
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

    useEffect(() => {
        setgetList(1)
    }, [user])


    return (
        <div className='div0'>
            <div className='navBar'>
                <span className='navBarOption'>Home</span>{' - '}
                <span className='navBarOption'>Library</span>{' - '}
                <span className='navBarOption'>Statistics</span>{'  '}
                <Login className='navBarOption'
                user={user}
                onLog={setuser}
                ></Login>

            </div>
            <div className='searchDiv'>
           {/* <h2 > data from server  </h2>  */}
           {/* <input value={input} onChange={(e) => setinput(e.target.value)}></input> */}
           <ItemInput input={input} setinput={setinput} ></ItemInput>
          
            <div className='buttonDiv'>
                <button onClick={() => console.log(filterType)}>debugging</button>
            {itemType.map((e) => {
               return <button className='button' onClick={() => setnewItem({'user': user, 'title': input, 'type': e})} > {e} </button>
            })}
           {/* <button className='button' onClick={() => setnewItem({'user': user, 'title': input, 'type': 'track'})} > TRACK </button>{' '}
           <button className='button' onClick={() => setnewItem({'user': user, 'title': input, 'type': 'book'})} > BOOK </button>{' '}
           <button className='button' onClick={() => setnewItem({'user': user, 'title': input, 'type': 'movie'})} > MOVIE </button>{' '}
           <button className='button' onClick={() => setnewItem({'user': user, 'title': input, 'type': 'tag'})} > TAG </button>{' '} */}
            </div>
            </div>

            <div>
                {loading? <Spinner animation="border" variant="warning" /> : ''}
            </div>
            
            <div className='displayItemDiv'>
                <select className='slide' onChange={(e) => setfilterType(e.target.value)}>
                    <option> All</option>
                    {itemType.map((e, i) => <option key={i} value={e} > {e} </option>)}

                </select>
            {dataFromServer? dataFromServer.filter(f => itemType.includes(filterType) ? f.type === filterType && f.user === user : f.user === user)
            .map((e, i) => { return <CardDisplay 
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
