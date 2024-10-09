import React, { useState } from 'react'
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import './index.css';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const UserAuth = ({ setUserToken }) => {
    const navigate = useNavigate();
    const api = useApi();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('error');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        api.auth('signin', { email: userEmail, password: userPassword })
            .then((data) => {
                localStorage.setItem('token', data.token);
                setUserToken(data.token);
                navigate('/')
            })
            .catch((err) => {
                switch (err) {
                    case '401': setError('Неверный логин или пароль');
                        console.log(error);
                        break;
                    case '404': setError('Пользователь с email не найден');
                        break;
                    default:
                        alert("Нет альтернативы");
                }
            });
    }
    return (
        <Modal
            open={!open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Авторизация</Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={6}>
                        <Button onClick={handleClick} variant='contained' color='primary' size='small'>
                            Войти
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={(e) => navigate('/react/createuser')} style={{ marginLeft: '20px' }} color='secondary' size='small'>
                            Регистрация
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal >
    )
}
