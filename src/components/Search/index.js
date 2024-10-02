import React, { useEffect, useState } from 'react'
import './index.css'
import { ReactComponent as CloseBtn } from '../../assets/svg/ic-close-input.svg'

export const Search = ({ setQuery }) => {
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    setQuery(searchText)
  }, [searchText]);
  const handleClick = () => {
    setSearchText('');
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Поиск'
        onChange={handleChange}
        className='search__input'
        value={searchText}
      />
      <button className='search__btn'>{searchText && <CloseBtn onClick={handleClick} />}</button>
    </div>
  )
}
