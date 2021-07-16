import React from 'react'
import styled from 'styled-components'
import {useRouteMatch} from 'react-router-dom'

export default function ProfilePage() {
  // const match = useRouteMatch();

  return (
    <PageContainer>
      <InnerContainer>
        
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
