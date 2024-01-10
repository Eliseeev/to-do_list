import {useState, useEffect} from 'react'
import Row from './components/Row'
import Started from './components/Started'
import InProcess from './components/InProcess'
import Finished from './components/Finished'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/esm/ListGroupItem';
import './components/style.css'


function App() {
  const [items, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [elements, setElements] = useState([])
  const [elemProcess, setElementsProcess] = useState([])
  const [elemFinished, setElementsFinished] = useState([])
  

  const uploadPosts = () => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => json.slice(0, 5))
        .then(json => setTodos([...items, ...json]))
  }

  useEffect(() => {
    const dataItems = localStorage.getItem('items')
    if(dataItems){
      setTodos(JSON.parse(dataItems))
    }
   },[])
   
   function sendSearchItems(){
    if(search.length !== 0){
      const searchDelete = search.filter((el) => {
         return onDelete(el.id)
      })
      setSearch(searchDelete)
     }
   }

   const searchTasks = (value) => {
          let arr = [];
          let idSearchItems;
          const itemsMod = items.map((el) => {
            return el.title
          })

          for(let i = 0; i < items.length; i++){
              arr.push(itemsMod[i] === value)
              if (arr.includes(true)) {
                const searchItems = items.filter((item) => {
                  return item.title === value})
                    idSearchItems = searchItems.filter((item) => {
                      return item.id = 2
                    })
                  setTodos([idSearchItems[0]])
              } else {
                setTodos([{id: 'Not found', title: 'Not found'}])
                setTimeout(() => reloadPage(), 1000)   
              }
          }
          setSearchTitle('')
  }
 
    const onDelete = (id) => {
      const newItems = items.filter((item) => item.id !== id)
      localStorage.setItem('items', JSON.stringify(newItems))
      setTodos(newItems)
    }

    const addMyTask = () => {
      let date = new Date()
      const newTask = {
        id: Date.now(), 
        title,
        hours: date.getHours(),
        minutes: date.getMinutes(),
        date: date.getDate(),
        mounth: date.getMonth(),
        fullYear:date.getFullYear(),
      }

      if (newTask.date < 10) {
        newTask.date = `0` + newTask.date
      } 
      
      if (newTask.mounth < 10) {
        newTask.mounth = `0` + (newTask.mounth + 1)
      }

      if (newTask.minutes < 10) {
        newTask.minutes = `0` + newTask.minutes
      }

      setTodos([...items, newTask])
      setTitle('')
      localStorage.setItem('items', JSON.stringify([...items, newTask]))
    }

    const trueEdit = (id, title, hours, minutes, date, mounth, fullYear) => {
      let newItem = {
            id: id, 
            title: title,
            hours: hours,
            minutes: minutes,
            date: date,
            mounth: mounth,
            fullYear: fullYear,
          }
          console.log(newItem)
      setTodos([...items.filter(p => p.id !== id), newItem].sort((a, b) => a.id - b.id))
      localStorage.setItem('items', JSON.stringify([...items.filter(p => p.id !== id), newItem].sort((a, b) => a.id - b.id)))
      }

    const startedTaskAdd = (id, title, hours, minutes, date, mounth, fullYear) => {
      let itemStart = {
        id: id, 
        title: title,
        hours: hours,
        minutes: minutes,
        date: date,
        mounth: mounth,
        fullYear: fullYear,
       }
       sendSearchItems()
       onDelete(itemStart.id)
       console.log([...elements.filter(p => p.id !== id), itemStart].sort((a, b) => a.id - b.id))
       setElements([...elements.filter(p => p.id !== id), itemStart].sort((a, b) => a.id - b.id))
       localStorage.setItem('items', JSON.stringify([...elements.filter(p => p.id !== id), itemStart]))
    }

    const deleteStartTask = (id) => {
      const itemsNewStart = elements.filter((element) => element.id !== id)
      localStorage.setItem('elements', JSON.stringify(itemsNewStart))
      setElements(itemsNewStart)
    }

  const InProcessTaskAdd = (id, title, hours, minutes, date, mounth, fullYear) => {
    let itemProcess = {
      id: id, 
      title: title,
      hours: hours,
      minutes: minutes,
      date: date,
      mounth: mounth,
      fullYear: fullYear,
     }
     sendSearchItems()
     onDelete(itemProcess.id)
     deleteStartTask(itemProcess.id)
     setElementsProcess([...elemProcess.filter(p => p.id !== id), itemProcess].sort((a, b) => a.id - b.id))
     localStorage.setItem('elementsProcess', JSON.stringify([...elemProcess.filter(p => p.id !== id), itemProcess]))
  }

  const deleteProcessTask = (id) => {
    const itemsNewProcess = elemProcess.filter((elem) => elem.id !== id)
    localStorage.setItem('elementsProcess', JSON.stringify(itemsNewProcess))
    setElementsProcess(itemsNewProcess)
  }

  const finishedTaskAdd = (id, title, hours, minutes, date, mounth, fullYear) => {
    let itemFinished = {
      id: id, 
      title: title,
      hours: hours,
      minutes: minutes,
      date: date,
      mounth: mounth,
      fullYear: fullYear,
     }
     sendSearchItems()
     onDelete(itemFinished.id)
     deleteStartTask(itemFinished.id)
     deleteProcessTask(itemFinished.id)
     setElementsFinished([...elemFinished.filter(p => p.id !== id), itemFinished].sort((a, b) => a.id - b.id))
     localStorage.setItem('elementsFinished', JSON.stringify([...elemFinished.filter(p => p.id !== id), itemFinished]))
  }

  const deleteFinishedTask = (id) => {
    const itemsNewFinished = elemFinished.filter((elem) => elem.id !== id)
    localStorage.setItem('elementsFinished', JSON.stringify(itemsNewFinished))
    setElementsFinished(itemsNewFinished)
  }

  const reloadPage = () => {
    return window.location.reload()
  }

  return (
    <div>
      <div className = 'header__wrapper'>
          <div className ='circle__figure-title'></div>
          <button className = 'header__title' onClick = {reloadPage}>To-do list</button>
          <p className = 'title'><button className='upload-to-do__btn' onClick = {uploadPosts}>Upload to-do</button></p>
      </div>

      <div className='container'>
            <div className='wrapper__fresh-task'>
               <form>
                  <h3 className = 'header__new-task'>New task:</h3>
                  <input
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='What is the task?' 
                    className= 'task__input'>
                  </input>
                <Button className='add__btn' variant="info" onClick={addMyTask} value="Add">Add</Button>
               </form>
            </div>
          <h3 className='header__fresh-task'>Fresh tasks:</h3>
              <div className ='task__search-wrapper'>
               <form>
                  <input
                    value={searchTitle} 
                    onChange={(e) => setSearchTitle(e.target.value)} 
                    placeholder='Find a task...' 
                    className= 'task__search'>
                  </input>
                  <Button className='search__btn' variant="dark" value="search" onClick={() => searchTasks(searchTitle)}>Search</Button>
               </form>
              </div>
                <div>
                  {items.length !== 0
                    ? <ListGroup>
                        {items && items.map((item, index)=>{
                          return <Row onDelete={onDelete} item={item} trueEdit={trueEdit} 
                          index={index} startedTaskAdd={startedTaskAdd} InProcessTaskAdd={InProcessTaskAdd}
                          finishedTaskAdd={finishedTaskAdd} searchTasks={searchTasks}> </Row>
                        })}
                      </ListGroup> : <div className = 'add__to-do'><h5>The to-do list is empty.</h5></div>}
                </div> 
          </div>
                <div className = 'wrapper'>
                    <div className = 'started'>
                        <h3 className = 'header__start'>Started</h3>
                          <ListGroup>
                            {elements.map((element, index) => {
                                return <Started index={index} deleteStartTask={deleteStartTask} 
                                element={element} InProcessTaskAdd={InProcessTaskAdd} finishedTaskAdd={finishedTaskAdd}></Started>
                            })}
                      </ListGroup>
                </div>

                  <div className = 'in__process'> 
                    <h3 className = 'header__process'>In process</h3>
                      <ListGroup>
                        {elemProcess.map((elProcess, index) => {
                            return <InProcess index={index} deleteProcessTask={deleteProcessTask} 
                            elProcess={elProcess}  finishedTaskAdd={finishedTaskAdd}></InProcess>
                        })}
                      </ListGroup>
                  </div>

                  <div className = 'finished'>
                      <h3 className = 'header__finished'>Finished</h3>
                        <ListGroup>
                            {elemFinished.map((elFinished, index) => {
                                return <Finished index={index} deleteFinishedTask={deleteFinishedTask} elFinished={elFinished}></Finished>
                            })}
                        </ListGroup>
                  </div> 
        </div>   
    </div>
  );
}

export default App;


