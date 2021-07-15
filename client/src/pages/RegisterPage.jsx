/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import RegisterForm from '../components/Register/RegisterForm'


export default function RegisterPage() {
  
  const auth = useSelector(state => state.auth)
  const errors = useSelector((state) => state.errors);
  const history = useHistory()

  useEffect(() => {
    if (!errors) {
      if (auth.isAuthenticated) {
        history.push('/dashboard')
      }
    }
  },[errors, auth.isAuthenticated])

  return (
    <PageContainer>
      <FormContainer>
        <RegisterForm/>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: gray;
  margin-top: 10vh;
  width: 100%;
  height: 90vh;
  display: flex;
`;

const FormContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 90%;
  margin: auto;
  align-self: center;
`;