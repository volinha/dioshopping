import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
    position: relative;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--primary);
    color: var(--background);
    text-align: center;
`

const Footer = () => {
    return (
        <>
            <StyledFooter className="mt-3 flex-end">
                SportShop 2022. <br /> Nenhum direito reservado.<br />
            </StyledFooter>
        </>
    )
}

export default Footer;