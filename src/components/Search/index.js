import React, { useEffect, useState } from 'react'
import './index.css'
export const Search = ({ setQuery }) => {
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    setQuery(searchText)
  }, [searchText]);
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
    </div>
  )
}