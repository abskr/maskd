import React from 'react'
import styled from 'styled-components'
import {Card, ListGroup} from 'react-bootstrap'

export default function PostFeeds() {
  return (
    <FeedsContainer>
      <Card className="mb-2">
        <Card.Body>
          <blockquote className='blockquote mb-0'>
            <p>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.{' '}
            </p>
            <footer className='blockquote-footer'>
              Someone famous in <cite title='Source Title'>Source Title</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <blockquote className='blockquote mb-0'>
            <p>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.{' '}
            </p>
            <footer className='blockquote-footer'>
              Someone famous in <cite title='Source Title'>Source Title</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </FeedsContainer>
  );
}

const FeedsContainer = styled.div`
`