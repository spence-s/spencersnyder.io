import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: inline-block;
    min-width: 15em;
    min-height: 3em
    margin: 0 1rem 0.3rem 0;
    box-sizing: border-box;
    text-decoration: none;
    border: 2px solid purple;
    border-radius: ${props => (props.rounded ? '.5rem' : '')}
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;

    :hover {
        background-color: purple
        color: white;
        transform: scale(1.1)
    }
`;

const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>;

export default Button;
