import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function Finished({deleteFinishedTask, elFinished, index}) {
  return (
    <div className='wrapper__started'>
    <ListGroup.Item key={index}>
      {`${index + 1}. ${elFinished.title}`}
             <Button variant="danger" onClick={() => deleteFinishedTask(elFinished.id)} className='delete__btn'>Delete</Button>
   </ListGroup.Item>
</div>
  )
}
