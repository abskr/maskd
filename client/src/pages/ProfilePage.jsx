import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
// import ProfileBadge from '../components/Dashboard/ProfileBadge.jsx';
import { getUserByUsername } from '../store/actions/usersActions.js'

export default function ProfilePage() {
  const users = useSelector(state => state.users)
  const {username} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserByUsername(username));
  },[])


  return (
    <PageContainer>
      <ProfileDetail/>
    </PageContainer>
  );

}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center
`

const ProfileDetail = styled.div`
  background-color: #1b263b;
  min-width: 40rem; 
`


