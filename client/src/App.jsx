import React from "react";
import styled from "styled-components";
import Login from './Login';
import GlobalStyle from "./styles/GlobalStyle";

const AppContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const App = () => {
    const code = new URLSearchParams(window.location.search).get('code')
    return (
        <>
            <GlobalStyle/>
            <AppContainer>
            <p>poopy</p>
            {code ? <Login /> : <Login />}
            </AppContainer>
        </>
    );
}

export default App;