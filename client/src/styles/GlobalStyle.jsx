import { createGlobalStyle } from "styled-components";

const GlobalStyle = () => createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body {
        padding: 0;
        margin: 0;
        font-family: Gill Sans;
    }

    a{
        color: inherit;
        text-decoration: none;
        display: block;
    }
`;

export default GlobalStyle