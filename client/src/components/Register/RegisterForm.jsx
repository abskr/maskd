import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, Form, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';

export default function RegisterForm() {
  const ageRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const history = useHistory()

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      age: ageRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      password2: password2Ref.current.value,
    }

    dispatch(registerUser(newUser, history))
  }

  const formChildMargin = {
    marginTop: '3px',
    marginBottom: '3px',
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
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
      <Button style={formChildMargin} type='submit'>
        Login
      </Button>
      <small>
        Already have an account? <Link to='/'>Click here</Link> to log
        in!
      </small>
    </FormContainer>
  );
}

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`


