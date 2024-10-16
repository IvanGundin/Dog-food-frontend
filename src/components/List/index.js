import React, { useContext } from 'react'
import { Card } from '../Card'
import PostsContext from '../../contexts/PostsContext'
import './index.css';

export const List = ({ favorites, setFavorites }) => {
  const { postsOnPage } = useContext(PostsContext);
  return (
    <div className='list'>
      {postsOnPage && postsOnPage?.map((item) => (
        <Card
          key={item._id}
          post={item}
          isInFavorites={favorites?.includes(item._id)}
          setFavorites={setFavorites}
        />))}
    </div>
  )
}
