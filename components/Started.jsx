import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function Started({deleteStartTask, element, index, InProcessTaskAdd, finishedTaskAdd}) {

  return (
    <div className='wrapper__started'>
           <ListGroup.Item key={index}>
             {`${index + 1}. ${element.title}`}
                    <Button variant="danger" onClick={() => deleteStartTask(element.id)} className='delete__btn'>Delete</Button>
                    <Button variant="warning" className='delete__btn' onClick={() => InProcessTaskAdd(element.id, element.title)}>In process</Button>
                    <Button variant="success" className='delete__btn' onClick={() => finishedTaskAdd(element.id, element.title)}>Finished</Button>
          </ListGroup.Item>
    </div>
  )
}

