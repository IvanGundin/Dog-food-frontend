import * as React from 'react';
import { useApi } from '../../hooks/useApi'
import './index.css';
import picture from '../../assets/icon_comments.png';
import { Link } from "react-router-dom";
import { Card as CardMUI } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Card = ({ post, isInFavorites, setFavorites }) => {
  const api = useApi();
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const writeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key)) || [];
    storage.push(value);
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const removeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key));
    const filteredStorage = storage.filter((postId) => value !== postId);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };

  const addFavorite = () => {
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
  return (
    <Stack>
      <CardMUI sx={{ width: 350, height: 525, background: 'rgba(251, 247, 250, 0.97)' }} className='card'>
        <CardContent>
          <Link to={`posts/${post._id}`} style={{ textDecoration: 'none' }}>
            <Typography gutterBottom variant="h6">
              <div className='authorName'>
                <Avatar src={post.author?.avatar} />
                {post.author?.name}
              </div>
            </Typography>
            <CardMedia
              component="img"
              height="150"
              src={post?.image}
              alt="img"
            />
            <Typography gutterBottom variant="h6">
              <div className='title'>{post?.title}</div>
            </Typography>
            <Typography gutterBottom variant="h9" color="text.secondary" className='text'>
              {post?.text}
            </Typography>
            <Button size="small">{post.author?.email}</Button>
            <div className='tags'>
              {post?.tags.map((data, index) => (<span style={{ color: 'blue', backgroundColor: '#c4fccc' }} key={index}>{data}</span>))}
            </div>
          </Link>
        </CardContent>
        <CardActions component="div">
          <img src={picture} alt="img" height='27' /><div className='comments'>{post.comments.length}</div>
          {isInFavorites ? (
            <IconButton aria-label='add to favorites' onClick={removeFavorite}>
              <FavoriteIcon /> {post.likes.length}
            </IconButton>
          ) : (
            <IconButton aria-label='add to favorites' onClick={addFavorite}>
              <FavoriteBorderOutlinedIcon /> {post.likes.length}
            </IconButton>
          )}
          {/* <div>{post?.created_at}</div> */}
          <div>{post?.created_at &&
            new Date(post.created_at).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}</div>
        </CardActions>
      </CardMUI >
      {isInFavorites ? (
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Пост "{post?.author?.name}" добавлен в избранное!
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            Пост "{post?.author?.name}" удален из избранного!
          </Alert>
        </Snackbar>
      )}
    </Stack>
  )
};