import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaHome, FaInfo, FaImages, FaScroll } from 'react-icons/fa';

const Container = styled.div`
  background: black;
  width: 100%;
  @media (max-width: 700px) {
    position: fixed;
    bottom: 0;
  }
`;

const UList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 2em;
  margin: 0;
  padding: 0;
  cursor: pointer;

  @media (max-width: 700px) {
    height: 2.5em;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  height: 100%;
  color: white;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
  flex-wrap: no-wrap;

  :hover {
    border-bottom: 5px solid purple;
    ${StyledLink} {
      color: purple;
    }
  }
`;

const DisappearingText = styled.span`
  @media (max-width: 700px) {
    visibility: hidden;
  }
`;

const NavLink = ({ text, Icon, to }) => (
  <ListItem>
    <StyledLink to={to}>
      <DisappearingText> {text} </DisappearingText>
      <Icon />
    </StyledLink>
  </ListItem>
);

const Header = () => (
  <Container>
    <UList>
      <NavLink text="Home" Icon={FaHome} to="/" />
      <NavLink text="About" Icon={FaInfo} to="/about" />
      <NavLink text="Portfolio" Icon={FaImages} to="/portfolio" />
      <NavLink text="Blog" Icon={FaScroll} to="/blog" />
    </UList>
  </Container>
);

NavLink.propTypes = {
  text: PropTypes.string,
  Icon: PropTypes.element,
  to: PropTypes.string
};

export default Header;
