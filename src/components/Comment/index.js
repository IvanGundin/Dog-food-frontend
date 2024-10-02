import React, { useEffect, useState, useContext } from 'react'
import { Avatar, Card, CardContent, CardHeader, Grid, Typography, IconButton } from '@mui/material'
import { useApi } from '../../hooks/useApi';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './index.css'
import UserContext from '../../contexts/UserContext'

export const Comment = ({ comment, post, setPost }) => {
    const api = useApi()
    const { myUser } = useContext(UserContext);
    const [author, setAuthor] = useState({})

    useEffect(() => {
        api.getData(`users/${comment.author}`)
            .then((value) => setAuthor(value))
            .catch((err) => console.log(err))
    }, [])

    const removeFavorite = () => {
        api.removeComment(post._id, comment._id)
            .then((value) => setPost(value))
            .catch((err) => console.log(err))
    }

    return (
        <>
            {comment && (<Card sx={{ minWidth: 375 }} className='card' >
                <Grid item container xs={16}>
                    <CardContent className='card-content'>
                        <Grid item xs={3}>
                            <CardHeader
                                avatar={<Avatar
                                    alt={author.name}
                                    src={author.avatar}
                                />}
                                title={author.name}
                                subheader={post?.created_at &&
                                    new Date(post.created_at).toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                                {comment.text}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            {myUser && (myUser._id === author._id) &&
                                <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            }
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>)}
        </>
    )
}
