import React from 'react'
import styled from 'styled-components'
import {Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, votePost } from '../../store/actions/feedActions';
import { Link } from 'react-router-dom'

export default function PostFeeds() {
  const feed = useSelector(state => state.feed)
  const userId = useSelector(state => state.auth.user.id)
  const dispatch = useDispatch()

  const handleUpvote = (postId) => {
    dispatch(votePost(postId)).then(dispatch(fetchPost()));
  }

  return (
    <FeedsContainer className='feedcontainer'>
      {feed.posts &&
        feed.posts.map((p) => (
          <Card className='mb-2' key={p._id}>
            <Card.Body>
              <blockquote className='blockquote mb-0'>
                <p> {p.text} </p>
                <footer className='blockquote-footer'>
                  <Link to={`/profile/${p.author.username}`}>
                    {p.author.username}
                  </Link>
                  {/* <cite title='Source Title'>Source Title</cite> */}
                </footer>
              </blockquote>
              {!p.votes.includes(userId) ? (
                <button onClick={() => handleUpvote(p._id)}>update</button>
              ) : (
                <button onClick={() => handleUpvote(p._id)}>de-update</button>
              )}
            </Card.Body>
            {p.image && <Card.Img variant='bottom' src={p.image} />}
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
    </FeedsContainer>
  );
}

const FeedsContainer = styled.div`
  height: 100%;
`