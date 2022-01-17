import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core/';
import Cart from '../Cart';
import styled from 'styled-components';
import Search from '../Search/Search';

const HeaderWrapper = styled.div`
    display: flex;

    background: var(--primary);
    
    font-family: "Roboto", monospace;
    height: 75px;
    width: 100%;
`

const HeaderTitle = styled.h1`
    font-family: 'Righteous', cursive;
    color: var(--background);
    
    margin: 0px 10px;

    height: 100%;
`

const HeaderLinks = styled(Link)`
    text-decoration: none;
    color: var(--background);

    Button {
        color: var(--background);
        font-size: 13px;
        font-family: "Roboto";

        transition: ease all 0.3s;

        &:hover{
        color: black;
        }
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                columns={12}
            >
                <Grid item xs={3}>
                    <HeaderTitle>
                        SPORTSHOP
                    </HeaderTitle>
                </Grid>
                <Grid item xs={7}>
                    <Search />
                </Grid>
                <Grid item xs={2}>
                    <HeaderLinks to="/">
                        <Button>Perfil</Button>
                    </HeaderLinks>
                    <HeaderLinks to="/contato">
                        <Button>Contato</Button>
                    </HeaderLinks>
                    <Cart />
                </Grid>

            </Grid>
        </HeaderWrapper>
    )
}

export default Header;
