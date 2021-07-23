import React, { useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {getUserByUsername} from '../../store/actions/usersActions'


export default function ProfileBadge({username}) {
  const uDetail = useSelector(state => state.users.selectedUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserByUsername(username));
    console.log(uDetail)
  },[])
  
  
  return (
    <Card>
      <Card.Header>Hey there, {}!</Card.Header>
      <ListGroup variant='flush'>
        <ListGroup.Item>Followers: </ListGroup.Item>
        <ListGroup.Item>Following: </ListGroup.Item>
        </ListGroup>
    </Card>
  );
}
