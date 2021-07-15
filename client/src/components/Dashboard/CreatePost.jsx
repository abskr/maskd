import React from 'react'
import { Button, Form, Modal} from 'react-bootstrap'

export default function CreatePost({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Post something!</Modal.Title>
      </Modal.Header>
      <Form>
      <Modal.Body>
          <Form.Control as='textarea' rows={3} />
          <Form.Control type='file' />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary'>Post!</Button>
      </Modal.Footer>
        </Form>
    </Modal>
  );
}
