import React, { useCallback, useRef } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../redux/user/user.action';

const { Search } = Input;

const SearchBar = () => {
 const dispatch = useDispatch();
 const timeoutRef = useRef(null);

 const debouncedSearch = useCallback((value) => {
   if (timeoutRef.current) clearTimeout(timeoutRef.current);
   timeoutRef.current = setTimeout(() => {
     dispatch(searchUsers(value));
   }, 1000);
 }, [dispatch]);

 return (
   <div>
     <Search
       placeholder="Search users by name..."
       allowClear
       enterButton
       size="large"
       style={{ 
         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
         borderRadius: '8px',
         overflow: 'hidden'
       }}
       onChange={(e) => debouncedSearch(e.target.value)}
     />
   </div>
 );
};

export default SearchBar;