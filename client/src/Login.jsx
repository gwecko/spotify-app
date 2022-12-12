import React from "react";
import styled from "styled-components";
import { loginUrl } from './spotify';

const StyledLogin = styled.div`
    button{
        padding: 20px;
        border: none;
        background-color: darkgreen;
    }
`;

const Login = () => {
    return (
        <StyledLogin>
            <button>
                {/* This talks to the server /login route! */}
                <a href={loginUrl}>Login to spotify</a>
            </button>
        </StyledLogin>
    )
}

export default Login