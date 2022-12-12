import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';


const root = createRoot(document.getElementById('app'));
root.render(<App />);
