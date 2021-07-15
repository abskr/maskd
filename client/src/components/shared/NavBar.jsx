import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default function NavBar() {
  return (
    <TopBar>
      <NavLink to='/'>
        <h1>Maskd</h1>
      </NavLink>
    </TopBar>
  );
}

 const TopBar = styled.div`
   background-color: white;
   color: black;
   position: fixed;
   top: 0;
   width: 100%;
   height: 10vh;

   display: flex;
   align-items: center;
  justify-content: center;
 `;

 const NavLink = styled(Link)`
  text-decoration: none;
  color: black
`