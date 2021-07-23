import React, { useRef } from 'react';
import styled from 'styled-components';
import { Modal, Form, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';

export default function RegisterModal(props) {
  const ageRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      age: ageRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      password2: password2Ref.current.value,
    };

    dispatch(registerUser(newUser, history));
  };

  const formChildMargin = {
    marginTop: '3px',
    marginBottom: '3px',
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      contentClassName='modal-colors'
    >

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <h4>Register</h4>
          <FormControl
            style={formChildMargin}
            type='text'
            ref={usernameRef}
            placeholder='username'
          />
          <FormControl
            style={formChildMargin}
            type='text'
            ref={ageRef}
            placeholder='age'
          />
          <FormControl
            style={formChildMargin}
            type='password'
            ref={passwordRef}
            placeholder='password'
          />
          <FormControl
            style={formChildMargin}
            type='password'
            ref={password2Ref}
            placeholder='confirm password'
          />
        </Modal.Body>
        <Modal.Footer>
          <Buttons type='submit'>Create!</Buttons>
          <Buttons onClick={props.onHide}>Close</Buttons>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const Buttons = styled.a`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  width: 105px;
  
  :hover{
  color:#000000;
  background-color:#FFFFFF;
  }

  @media all and (max-width:30em){
 a.button1{
  display:block;
  margin:0.4em auto;
  }  
  }
`;
