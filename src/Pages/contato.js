import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, styled } from '@material-ui/core/';
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'var(--primary)',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'var(--primary)',  
    }
})

const SendButton = styled(Button)({
    backgroundColor: 'var(--primary)',
    transition: 'ease all 0.2s',

    '&:hover': {
        backgroundColor: 'var(--primary-hover)'
    }
})

const DeleteButton = styled(Button)({
    width: '100%',
    height: '100%'
})

const DeleteIcon = styled(DeleteForeverIcon)({
    fontSize: '50px',
    color: 'var(--secondary)',
})


const Contatos = () => {

    const url = process.env.REACT_APP_MESSAGE_BASE_URL;
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validate, setValidate] = useState(false);
    const [success, setSuccess] = useState(false);
    const [render, setRender] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [deleted, setDeleted] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setMessage(data);
    }, [render, url])

    function validateEmail(value) {
        var input = document.createElement('input');

        input.type = 'email';
        input.required = true;
        input.value = value;

        return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
    }

    const sendMessage = () => {
        setValidate(false);
        setInvalidEmail(false);

        if (author.length <= 0 || content.length <= 0) {
            return setValidate(!validate);
        }

        if (!validateEmail(author)) return setInvalidEmail(!invalidEmail);

        const bodyData = {
            email: author,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    setRender(true);
                    setSuccess(true);
                    setTimeout(() => { setSuccess(false) }, 3000)
                }
            })
            .then(setRender(false));
        setAuthor('');
        setContent('');
    }

    const deleteMessage = (id) => {
        const bodyData = {
            id: id,
        }

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    setRender(true);
                    setDeleted(true);
                    setTimeout(() => { setDeleted(false) }, 3000)
                }
            })
            .then(setRender(false));
    }

    return (
        <div className="vh-100">
            <h2 style={{ color: 'var(--primary)', margin: '8px 8px' }}>Envie sua mensagem!</h2>
            <Grid container direction="row" xs={12}>
                <CustomTextField
                    id="name"
                    label="Email"
                    variant="filled"
                    value={author}
                    onChange={(e) => { setAuthor(e.target.value) }}
                    className="my-2 mx-2 text-field w-50"
                />
                <CustomTextField
                    id="message"
                    label="Mensagem"
                    variant="filled"
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
                    fullWidth
                    multiline
                    className="my-2 mx-2 text-field"
                />
            </Grid>

            {validate && (
                <div className="alert alert-warning alert-dismissible fade show mx-2 my-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {invalidEmail && (
                <div className="alert alert-warning alert-dismissible fade show mx-2 my-2" role="alert">
                    <strong>Email inválido!</strong>
                </div>
            )}

            {success && (
                <div className="alert alert-success alert-dismissible fade show mx-2 my-2" role="alert">
                    <strong>Mensagem enviada!</strong>
                </div>
            )}

            {deleted && (
                <div className="alert alert-danger alert-dismissible fade show mx-2 my-2" role="alert">
                    <strong>Mensagem deletada!</strong>
                </div>
            )}

            <SendButton onClick={sendMessage} variant="contained" color="primary" className="my-2 mx-2 w-50">
                <SendIcon className="mr-2" />
                &nbsp;Enviar
            </SendButton>
            {message.slice(0).reverse().map((content) => {
                return (
                    <div className="card m-2" key={content.id}>
                        <div className="card-body">
                            <Grid container spacing={1} direction="row">
                                <Grid item xs={11}>
                                    <h5 className="card-title">{content.email}</h5>
                                    <p className="card-text">{content.message}</p>
                                    <p className="card-text"><small className="text-muted">{content.created_at.substring(8, 10) + "/" + content.created_at.substring(5, 7) + "/" + content.created_at.substring(0, 4) + " às " + content.created_at.substring(11, 16)}</small></p>
                                </Grid>
                                <Grid item xs={1}>
                                    <DeleteButton>
                                        <DeleteIcon
                                            style={{ 
                                                fontSize: '50px', 
                                                color: 'var(--secondary)', 
                                            }}
                                            onClick={() => deleteMessage(content.id)}
                                        />
                                    </DeleteButton>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Contatos;
