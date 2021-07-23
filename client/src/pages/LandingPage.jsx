import React, {useState} from 'react'
import styled from 'styled-components'
import LoginModal from '../components/shared/LoginModal'
import { useHistory } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

export default function LandingPage() {
  const [loginModalShow, setLoginModalShow] = useState(false)
  const history = useHistory()

  return (
    <PageContainer>
      <div>
        <Row>
          <Col>
            <TitleBox>
              <h1>Maskd.</h1>
              <h2>Express yourself out loud, with less exposure.</h2>
            </TitleBox>
          </Col>
        </Row>
        <Row className='pt-3'>
          <Col className='text-center' xs={12} md={6}>
            <Buttons onClick={() => setLoginModalShow(true)}>Login</Buttons>
            <LoginModal
              show={loginModalShow}
              onHide={() => setLoginModalShow(false)}
            />
          </Col>
          <Col className='text-center' xs={12} md={6}>
            <Buttons onClick={() => history.push('/register')}>
              Register
            </Buttons>
          </Col>
        </Row>
        <Row></Row>
      </div>
    </PageContainer>
  );
}

const PageContainer = styled(Container)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleBox = styled.div`
  text-align: center
`

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



