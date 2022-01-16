import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {

    const url = process.env.REACT_APP_MESSAGE_BASE_URL;
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validate, setValidate] = useState(false);
    const [success, setSuccess] = useState(false);
    const [render, setRender] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setMessage(data);
    }, [render])

    const sendMessage = () => {
        setValidate(false);
        if (author.length <= 0 || content.length <= 0) {
            return setValidate(!validate);
        }

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
                    setTimeout(() => {setSuccess(false)}, 3000)
                }
            })
            .then(setRender(false));
        setAuthor('');
        setContent('');
    }

    return (
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(e) => { setAuthor(e.target.value) }} fullWidth />
                <TextField id="message" label="Message" value={content} onChange={(e) => { setContent(e.target.value) }} fullWidth />
            </Grid>

            {validate && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Mensagem enviada!</strong>
                </div>
            )}

            <Button onClick={sendMessage} variant="contained" color="primary">
                Send
            </Button>
            {message.map((content) => {
                return (
                    <div className="card mt-2" key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Contatos;
