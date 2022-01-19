import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core/';
import Cart from '../Cart';
import styled from 'styled-components';
import Search from '../Search/Search';

import './responsive.css';

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

const HomeLink = styled(Link)`
    text-decoration: none;
    color: var(--background);

    &:hover{
        text-decoration: none;
        color: var(--background);
    }
`

const Header = () => {

    return (
        <HeaderWrapper>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                columns={12}
            >
                <Grid item md={3} xs={7}>
                    <HeaderTitle>
                        <HomeLink to='/'>
                            SPORTSHOP
                        </HomeLink>
                    </HeaderTitle>
                </Grid>
                <Grid item md={0} xs={7} className="searchbar">
                    <Search />
                </Grid>
                <Grid item md={2} xs={5} justifyContent="flex-end">
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
