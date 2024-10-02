import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useApi } from '../../hooks/useApi';
import AllPostContext from '../../contexts/AllPostsContext'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const EditPost = ({ openEdit, setOpenEdit, post, setPost }) => {
    const api = useApi();
    const { setPosts } = React.useContext(AllPostContext);
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState([])
    React.useEffect(() => {
        post && setTitle(post.title);
        post && setImage(post.image);
        post && setText(post.text);
        post && setTags('#' + post.tags.join(' #'));
    }, [post])

    const handleClose = () => {
        const editTags = tags.split('#').filter((item) => {
            if (item != '') {
                return item.trim();
            }
        });
        api.editPost(post._id, {
            title: title,
            text: text,
            image: image,
            tags: editTags,
        })
            .then((data) => {
                setPost(data);
                setOpenEdit(false);
                api.getPosts()
                    .then((data) => {
                        setPosts(data);
                    })
                    .catch((err) => alert(err))
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={openEdit || false}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Редактирование
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Сохранить
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <TextField
                            label="Title"
                            fullWidth
                            multiline
                            variant="standard"
                            value={title}
                            onChange={({ target }) => {
                                setTitle(target.value);
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Image"
                            fullWidth
                            variant="standard"
                            value={image}
                            onChange={({ target }) => {
                                setImage(target.value);
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Title"
                            fullWidth
                            variant="standard"
                            multiline
                            value={text}
                            onChange={({ target }) => {
                                setText(target.value);
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Title"
                            fullWidth
                            variant="standard"
                            multiline
                            value={tags}
                            onChange={({ target }) => {
                                setTags(target.value);
                            }}
                        />
                    </ListItem>
                </List>
            </Dialog>

        </div >
    );
}