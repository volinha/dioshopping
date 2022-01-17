import { createGlobalStyle } from "styled-components";
import '../../colors.css';

export const GlobalStyle = createGlobalStyle`
    body {
        background: var(--background);
        padding: 0px;
    }
`;