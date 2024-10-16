import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import UserContext from '../../contexts/UserContext';
import './index.css'
export const AddPost = () => {
    const navigate = useNavigate();
    const navigatToCreatePage = () => {
        navigate('react/posts/create')
    };
    const { myUser, setMyUser } = useContext(UserContext);
    const logout = () => {
        localStorage.clear();
        setMyUser(null)
        navigate('react/authFront');
    }
    const navigateEditUser = () => {
        navigate('react/user/edit');
    }
    return (
        <div>
            {myUser &&
                <div className='userContainer'>
                    <Button className='add' onClick={navigatToCreatePage} color="secondary">Добавить товар</Button>
                    <div className='chipOne'><Chip avatar={<Avatar src={myUser?.avatar}></Avatar>} label={myUser?.name} onClick={navigateEditUser} color="info" variant='outlined'></Chip></div>
                    <div className='chipTwo'> <Chip onClick={logout} icon={<LogoutIcon />} label='Выйти' color="info" variant='outlined' className='logOut' ></Chip></div>
                </div>}
        </div >)
}