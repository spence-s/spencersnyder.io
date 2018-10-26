import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaAnchor } from 'react-icons/fa';

const Container = styled.div`
    background: black;
    width: 100%;
`;

const UList = styled.ul`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 5em;
    margin: 0;
    padding: 0;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    transition: all 0.5s;
    padding: 0 3em;
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
    transition: all 0.5s;
    :hover {
        border-bottom: 15px solid purple;
        ${StyledLink} {
            color: purple;
        }
    }
`;

const Header = () => (
    <Container>
        <UList>
            <ListItem>
                <StyledLink>
                    <FaAnchor />
                    Home
                </StyledLink>
            </ListItem>
            <ListItem>
                <StyledLink>About</StyledLink>
            </ListItem>
            <ListItem>
                <StyledLink>Portfolio</StyledLink>
            </ListItem>
            <ListItem>
                <StyledLink>Blog</StyledLink>
            </ListItem>
        </UList>
    </Container>
);

export default Header;
