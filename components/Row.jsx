import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './style.css';



export default function Row({item, onDelete, index, trueEdit, startedTaskAdd,
  InProcessTaskAdd, finishedTaskAdd}){
  const [titleEdit, setTitleEdit] = React.useState(item.title);
  const [isActive, setIsActive] = React.useState(false);
 
  const onConfirm = () => {
      trueEdit(item.id, titleEdit, item.hours, item.minutes, item.date, item.mounth, item.fullYear);
      setIsActive(false);
  }

  const onEdit = () => {
    setIsActive(true);
  }

  return (
    <div>
      {item.id === 'Not found' ? <div className ='todo__not-found'><h5>{`${item.title}`}</h5></div>
      : 
        <div className = 'row'>
          <ListGroup.Item key={index}>
            <div className={`${isActive ? "btn__hide" : ""}`}>
                {`${index + 1}. ${item.title}`}
                        <Button variant="danger" onClick={() => onDelete(item.id)} className='delete__btn'>Delete</Button>
                        <Button variant="secondary" onClick = {onEdit} className='changes__btn'>Edit</Button>
                        <Button variant="light" className='delete__btn' onClick={() => 
                          startedTaskAdd(item.id, titleEdit, item.hours, item.minutes, item.date, item.mounth, item.fullYear)}>Started</Button>
                        <Button variant="warning" className='delete__btn' onClick={() => 
                          InProcessTaskAdd(item.id, titleEdit, item.hours, item.minutes, item.date, item.mounth, item.fullYear)}>In process</Button>
                        <Button variant="success" className='delete__btn' onClick={() => 
                          finishedTaskAdd(item.id, titleEdit, item.hours, item.minutes, item.date, item.mounth, item.fullYear)}>Finished</Button>
                        {item.hours || item.minutes || item.date || item.mounth || item.fullYear 
                        ? <div className ='time__value'><p className ='time__desc'>Time of post creation:</p>{`${item.hours}:${item.minutes} ${item.date}.${item.mounth}.${item.fullYear}`}</div> 
                        : <div className ='none-value__time'></div>}   
                  </div>
                  <div className={`btn__changes${isActive ? "btn__active" : ""}`}>
                    <input value={titleEdit}
                        placeholder='Введите текст:' 
                        onChange={(e) => setTitleEdit(e.target.value)}
                        className='edit__input'>
                    </input>
                <Button variant="primary" size="lg" placeholder='Измените текст' 
                className='changes__btn' onClick={onConfirm}>Confirm changes?</Button>
            </div>
          </ListGroup.Item>
      </div>
       }
    </div>
  )
}
 