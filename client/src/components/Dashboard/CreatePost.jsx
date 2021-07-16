import React, { useRef } from 'react'
import { Button, Form, Modal} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { newPost } from '../../store/actions/feedActions'
import { useHistory } from 'react-router-dom'

export default function CreatePost({show, handleClose}) {
  const textRef = useRef()
  const imgRef = useRef()

  const history = useHistory()

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPostInput = {
      text: textRef.current.value,
      image: imgRef.current.files[0]
    }
    
    dispatch(newPost(newPostInput, history))
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Post something!</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
          <Form.Control ref={textRef} as='textarea' rows={3} />
          <Form.Control ref={imgRef} type='file' accept="image/*"/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' type='submit'>Post!</Button>
      </Modal.Footer>
        </Form>
    </Modal>
  );
}
