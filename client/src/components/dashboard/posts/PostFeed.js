/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { getPosts } from '../../../actions/postActions';


const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts),
});

const PostFeed = (props) => {
  useEffect(() => {
    props.getPosts()
    console.log(props)
  }, []);

  return (
      <div>
        <button onClick={props.getPosts}/>
      </div>
  );
}



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostFeed);