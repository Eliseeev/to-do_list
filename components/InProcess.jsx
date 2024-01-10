import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function InProcess({deleteProcessTask, elProcess, index, finishedTaskAdd}) {
  return (
    <div className='wrapper__started'>
    <ListGroup.Item key={index}>
      {`${index + 1}. ${elProcess.title}`}
             <Button variant="danger" onClick={() => deleteProcessTask(elProcess.id)} className='delete__btn'>Delete</Button>
             <Button variant="success" className='delete__btn' onClick={() => finishedTaskAdd(elProcess.id, elProcess.title)}>Finished</Button>
   </ListGroup.Item>
</div>
  )
}
