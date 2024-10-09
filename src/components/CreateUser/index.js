import React, { useState } from 'react'
import { Grid, TextField, Button, Typography } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export const CreateUser = ({ setUserToken }) => {
    const navigate = useNavigate();
    const api = useApi();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userAbout, setUserAbout] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const handleClick = () => {
        api.authCreateUser('signup', { email: userEmail, group: "group-1", password: userPassword })
            .then((data) => {
                localStorage.setItem('token', data.token);
                setUserToken(data.token);
            }).then(() => {
                api.auth('signin', { email: userEmail, password: userPassword })
                    .then((data) => {
                        localStorage.setItem('token', data.token);
                        setUserToken(data.token);
                    }).then(() => {
                        api.editUserData({ name: userName, about: userAbout }, localStorage.getItem('token'))
                        navigate('/')
                    })
            }).catch((err) => {
                switch (err) {
                    case '400': setError('Данные введены неверно');
                        break;
                    case '409': setError('Пользователь с email существует');
                        break;
                    default:
                        alert("Что-то пошло не так");
                }
            })
    }
    return (
        <div>
            <Grid container flexDirection='column' spacing='10'>
                <Grid item>
                    <Typography variant='h3'>Регистрация</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label='e-mail'
                        variant='outlined'
                        value={userEmail}
                        type='email'
                        onChange={({ target }) => {
                            setUserEmail(target.value);
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label='Имя'
                        variant='outlined'
                        value={userName}
                        onChange={({ target }) => {
                            setUserName(target.value);
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label='О себе'
                        variant='outlined'
                        value={userAbout}
                        onChange={({ target }) => {
                            setUserAbout(target.value);
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label='Пароль'
                        variant='outlined'
                        type='password'
                        onChange={({ target }) => {
                            setUserPassword(target.value);
                        }}
                    />
                </Grid>
                <Typography color='red'>{error}</Typography>
                <Grid item>
                    <Button onClick={handleClick} variant='contained' color='secondary' size='small'>
                        Войти
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
