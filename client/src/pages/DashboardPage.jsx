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
          clasName='therowimlookingfor'
        >
          <Col xs={12} md={4}>
            <ProfileBadge user={user} />
            <button onClick={handleShow}>add post</button>
            <CreatePost show={show} handleClose={handleClose} />
            <button onClick={handleLogout}>logout</button>
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
  background-color: gray;
  margin-top: 10vh;
  width: 100%;
  height: 90vh;
  display: flex;
`;

const InnerContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  padding: 1rem;
  height: 90%;
  width: 90%;
  margin: auto;
  align-self: center;
`;