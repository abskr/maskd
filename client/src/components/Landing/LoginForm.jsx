/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/actions/authActions'
import { useHistory, Link } from 'react-router-dom'
import { Button, Form, FormControl } from 'react-bootstrap'

export default function LoginForm(props) {
  const usernameRef = useRef('')
  const passwordRef = useRef('')

  const history = useHistory()

  const auth = useSelector(state => state.auth)
  const errors = useSelector(state => state.errors)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth.isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }

    dispatch(loginUser(userData));
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
        type='password'
        ref={passwordRef}
        placeholder='password'
      />
      <Button style={formChildMargin} type='submit'>
        Login
      </Button>
      <small>
        No account? <Link to='/register'>Click here</Link> to sign up!
      </small>
    </FormContainer>
  );
}

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`;