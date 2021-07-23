/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { useHistory, Link } from 'react-router-dom';
import { Modal, Form, FormControl } from 'react-bootstrap'

export default function LoginModal(props) {
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const history = useHistory();

  const auth = useSelector((state) => state.auth);
  // const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth.isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(loginUser(userData));
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
        <h4>Log In</h4>
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
      </Modal.Body>
      <Modal.Footer>
        <Buttons style={formChildMargin} type='submit'>
          Login
        </Buttons>
        <small>
          No account? <Link to='/register'>Click here</Link> to sign up!
        </small>
        <Buttons onClick={props.onHide}>Close</Buttons>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}



const Buttons = styled.button`
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
