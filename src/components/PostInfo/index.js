import React, { useEffect, useState, useContext } from 'react';
import './indexInfo.css';
import picture from '../../assets/icon_comments.png';
import { useApi } from '../../hooks/useApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import UserContext from '../../contexts/UserContext';
import { EditPost } from '../EditPost'
import { Card as CardMUI, Button, CardHeader, TextField, Typography, Grid } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Comment } from '../Comment';
import { AlertDialog } from '../AlertDialog';
import Stack from '@mui/material/Stack';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PostInfo = ({ changePost, favorites, setFavorites }) => {
    const api = useApi();
    const { myUser, setMyUser } = useContext(UserContext);
    const { writeLS, removeLS } = useLocalStorage();
    const [openEdit, setOpenEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [post, setPost] = useState();
    const [comment, setComment] = React.useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        api.getPosts(params.itemId)
            .then((data) => {
                setPost(data);
            })
            .catch((err) => alert(err));
    }, []);

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const addToFavorite = () => {
        writeLS('favorites', post._id);
        ++post.likes.length
        setFavorites((prevState) => [...prevState, post._id]);
        api.addLikes(post._id)
            .then((added) => {
                setOpen(true);
            })
            .catch(() => {
                alert('Не удалось добавить')
            });
    };

    const removeFavorite = () => {
        removeLS('favorites', post._id);
        --post.likes.length
        setFavorites((prevState) => prevState.filter((postId) => post._id !== postId));
        api.deleteLikes(post._id)
            .then((remove) => {
                setOpen(true);
            })
            .catch(() => {
                alert('Не удалось удалить')
            });
    };

    const handleClik = () => {
        setOpenDeleteDialog(true);
    }

    const deletePost = () => {
        api.deletePost(params.itemId)
            .then((data) => {
                alert('Вы удалили товар')
                changePost((prevState) => {
                    return prevState.filter((post) => post._id !== params.itemId);
                })
                navigate('/react')
            })
            .catch((err) => alert(err));

    }

    const addComment = () => {
        api.addComment(params.itemId, comment)
            .then((data) => {
                setPost(data);
                changePost((prevState) => {
                    return prevState.map((post) => {
                        if (post._id === params.itemId) {
                            return data;
                        } else {
                            return post;
                        }
                    });
                })
                setComment('');
            })
            .catch((err) => alert(err));
    }

    const button = <>
        <Button onClick={handleClickOpenEdit} variant="contained" color='primary' size='small' style={{ marginRight: '20px' }}><EditIcon />Редактировать товар</Button>
        <Button onClick={handleClik} variant="contained" color='primary' size='small'><DeleteForever />Удалить товар</Button>
    </>

    return (
        <Stack>
            <AlertDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} item={post} deletePost={deletePost} />
            <EditPost openEdit={openEdit} setOpenEdit={setOpenEdit} post={post} setPost={setPost} />
            <div>
                <Link to='/react'><Button variant="contained" color='primary' size='small' style={{ margin: '20px' }}><KeyboardBackspaceIcon />назад</Button></Link>
                <form className='form'>
                    <CardMUI className='cardInfo' sx={{ width: '1100px', height: 'auto', background: 'rgba(248, 240, 241, 0.987)' }}>
                        <div>
                            {
                                myUser?.name === post?.author.name && button
                            }
                        </div>
                        <div className='card__title'>

                            <h2 style={{ fontFamily: 'cursive' }}> {post?.title} </h2>
                            <CardHeader
                                avatar={<Avatar
                                    alt={post?.author.name}
                                    src={post?.author.avatar}
                                />}
                                title={post?.author.name}
                                subheader={<div>{post?.created_at &&
                                    new Date(post.created_at).toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}</div>}
                            />
                        </div>
                        <CardContent className='cardImg'>
                            <img src={post?.image} width="500" alt="картинка" />
                        </CardContent>
                        <div className='card__about'>
                            <div>
                                <h4> {post?.text} </h4>
                            </div>
                            <div className='tags'>
                                {post?.tags.map((data, index) => (<span style={{ color: 'blue', backgroundColor: '#c4fccc' }} key={index}>{data}</span>))}
                            </div>
                            <span className='card__likes'>
                                {favorites?.includes(post?._id) ? (
                                    <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                        <FavoriteIcon /> {post?.likes.length}
                                    </IconButton>
                                ) : (
                                    <IconButton aria-label='add to favorites' onClick={addToFavorite}>
                                        <FavoriteBorderOutlinedIcon /> {post?.likes.length}
                                    </IconButton>
                                )}
                            </span>
                        </div>
                    </CardMUI >
                    <Grid item container xs={16}>
                        <Grid item xs={16}>
                            <img src={picture} alt="picture" height='27' style={{ paddingTop: '20px' }} /><span className='comments'>{post?.comments.length}</span>
                            <Typography variant='h6'>
                                Комментарии:
                            </Typography>
                            {
                                post?.comments.map((comment) => <Comment comment={comment} key={comment._id} post={post} setPost={setPost} />)
                            }
                        </Grid>
                    </Grid>
                    <div className='add-comment'>
                        <Typography>Добавить комментарий:</Typography>
                        <TextField
                            fullWidth
                            label='Введите комментарий'
                            style={{ backgroundColor: 'white' }}
                            variant='outlined'
                            multiline
                            rows={4}
                            value={comment}
                            onChange={({ target }) => {
                                setComment(target.value);
                            }}
                        />
                        <Button onClick={addComment} variant="contained" color='primary' size='small'>Отправить</Button>
                    </div>
                </form >
                <Link to='/react'><Button variant="contained" color='primary' size='small' style={{ margin: '20px' }}><KeyboardBackspaceIcon />назад</Button></Link>
            </div>
            {(favorites?.includes(post?._id)) ? (
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Товар "{post?.author?.name}" добавлен в избранное!
                    </Alert>
                </Snackbar>
            ) : (
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Товар "{post?.author?.name}" удален из избранного!
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    )
};
