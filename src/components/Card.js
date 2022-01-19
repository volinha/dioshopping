import React from 'react';
import { Grid, Typography } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import cartActions from './store/actions/cart';

import Rating from '@mui/material/Rating';

import styled from 'styled-components';

import '../colors.css';

const CardButton = styled.button`
    margin-top: 50px;
    background-color: var(--primary);
    border-radius: 5px;
    color: var(--background);
    width: 100%;

    transition: ease all 0.2s;

    &:hover{
        background-color: var(--primary-hover)
    }
`

const StyledPaper = styled.div`
    padding: 8px;
    text-align: center;
    min-height: 300px;

    transition: ease all 0.2s;

    &:hover{
        -webkit-box-shadow: 5px 5px 15px -2px #000000; 
        box-shadow: 5px 5px 15px -2px #000000;
    }
`

const ProductTitle = styled.h6`
    font-family: 'Roboto', Arial;
    font-weight: 500;
    font-size: 1.2em;
    margin-top: 3px;
`

const Card = ({ product, children }) => {
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch();

    return (
        <Grid item xs={3}>
            <StyledPaper>
                <Grid container direction='column' justifyContent="flex-end" alignItems="center">
                    <Grid item xs>
                        <img width="140px" height="140px" src={product.image} alt={product.name_product} />
                        
                        <ProductTitle>
                            {children}
                        </ProductTitle>
                        <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                        <Typography variant='subtitle1'>
                            R$ {product.price.toFixed(2)}
                        </Typography>
                        
                    </Grid>
                    <CardButton
                        variant="contained"
                        onClick={() => dispatch(cartActions.Add(cart, product))}
                    >
                        Adicionar
                    </CardButton>
                </Grid>
            </StyledPaper>
        </Grid>
    )
}

export default Card;