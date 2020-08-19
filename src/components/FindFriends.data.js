import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { UserList } from './index';

function FindFriends() {
  const [users, setUsers] = useState([]);
  // const buttonRef = React.createRef();
  // const action = "Add friend";
  let buttonRef = null;
  const setRef = element => {
    buttonRef = element;
  }
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleAddFriend = async (id) => {
    try {
      const response = await axios.post(`/fr?id=${id}`);
      // const el = document.querySelector(".action");
      // el.innerHTML = response.status === 201 ? "Friend request sent" : "Add friend";
      buttonRef.innerHTML = response.status === 201 ? "Friend request sent" : "Add friend";
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchUsers();
  },[]);
  return (
    <UserList title={'People you may know'}
      users={users} onClick={handleAddFriend} setButtonRef={setRef} />
  );
}
 
export default FindFriends;