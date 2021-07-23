import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Col, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../store/actions/feedActions';
import { logoutUser } from '../store/actions/authActions'

import ProfileBadge from '../components/Dashboard/ProfileBadge'
import PostFeeds from '../components/Dashboard/PostFeeds'
import CreatePost from '../components/Dashboard/CreatePost'

export default function DashboardPage() {
  const [show, setShow] = useState(false)

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPost())
  })
  
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser());
  }

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  
  return (
    <PageContainer>
      <InnerContainer>
        <Row
          style={{ width: '100%', height: '100%' }}
        >
          <Col xs={12} md={4}>
            <ProfileBadge username={user.username}/>
            <Buttons className="mt-2" onClick={handleShow}>add post</Buttons>
            <CreatePost show={show} handleClose={handleClose} />
            <Buttons onClick={handleLogout}>logout</Buttons>
          </Col>
          <Col xs={12} md={8} style={{ height: '100%', overflowY: 'scroll' }}>
            <PostFeeds />
          </Col>
        </Row>
      </InnerContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const InnerContainer = styled.div`
  border-radius: 10px;
  background-color: #1b263b;
  padding: 1rem;
  height: 100%;
  width: 90%;
  margin: auto;
  align-self: center;
  justify-self: center;
`;

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