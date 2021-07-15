import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export default function ProfileBadge({user}) {
  
  
  return (
    <Card>
      <Card.Header>Hey there, {user.username}!</Card.Header>
      <ListGroup variant='flush'>
        <ListGroup.Item>Followers: {user.followers.length}</ListGroup.Item>
        <ListGroup.Item>Following: {user.following.length}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
