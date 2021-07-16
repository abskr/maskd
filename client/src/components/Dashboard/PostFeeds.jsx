import React from 'react'
import styled from 'styled-components'
import {Card} from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function PostFeeds() {
  const feed = useSelector(state => state.feed)
  return (
    <FeedsContainer className="feedcontainer">
      {feed.posts &&
        feed.posts.map((p) => (
          <Card className='mb-2' key={p._id}>
            <Card.Body>
              <blockquote className='blockquote mb-0'>
                <p>
                  {' '}
                  {p.text}{' '}
                </p>
                <footer className='blockquote-footer'>
                  {p.author.username}{' '}
                  {/* <cite title='Source Title'>Source Title</cite> */}
                </footer>
              </blockquote>
            </Card.Body>
            {p.image && <Card.Img variant="bottom" src={p.image}/>}
          </Card>
        ))}
      <Card className='mb-2'>
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
      {/* <Card>
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
      </Card> */}
    </FeedsContainer>
  );
}

const FeedsContainer = styled.div`
  height: 100%;
`