import React from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const CreatePost = ({ changePost }) => {
    const navigate = useNavigate();
    const api = useApi();
    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            target: { title, text, image, tags: { value } }
        } = event;
        const editTags = value.split('#').filter((item) => {
            if (item != '') {
                return item.trim();
            }
        });
        api.addPost({
            title: title.value,
            text: text.value,
            image: image.value,
            tags: editTags,
        })
            .then((data) => {
                changePost((prevState) => [data, ...prevState]);
                navigate('/react')
            })
            .catch((err) => alert(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container flexDirection='column' alignItems='center' spacing='15'>
                <Grid item>
                    <h2>Предложите ваш товар</h2>
                </Grid>
                <Grid item>
                    <TextField fullWidth multiline required label='Название' name='title' variant='outlined' style={{ width: '15em' }} />
                </Grid>
                <Grid item>
                    <TextField fullWidth multiline required label='Описание' name='text' variant='outlined' style={{ width: '15em' }} />
                </Grid>
                <Grid item>
                    <TextField fullWidth multiline required label='Картинка https://...' name='image' variant='outlined' style={{ width: '15em' }} />
                </Grid>
                <a href="https://dogfood-web.tilda.ws/addformimage" style={{ color: 'blue', textDecoration: 'none' }}>загрузить картинку</a>
                <Grid item>
                    <TextField
                        inputProps={{ pattern: "^(#{1}.{1,}){1,}$", title: 'Tags should contain #, e.g. #home #aboutme' }}
                        name="tags"
                        label="Tags separated by #"
                        variant="outlined"
                        style={{ width: '15em' }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' color='secondary' size='small'>
                        Добавить товар
                    </Button>
                </Grid>
            </Grid>
            <Link to='/react'><Button variant="contained" color='primary' size='small' style={{ margin: '20px' }}><KeyboardBackspaceIcon />назад</Button></Link>
        </form >
    )
}