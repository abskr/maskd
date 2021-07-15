import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LoginForm from '../components/Landing/LoginForm'

export default function LandingPage() {
  return (
    <PageContainer>
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  background-color: gray;
  margin-top: 10vh;
  width: 100%;
  height: 90vh;
  display: flex;
`

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
`