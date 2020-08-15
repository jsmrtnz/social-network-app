import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Image } from 'semantic-ui-react'
import { _arrayBufferToUrl } from '../utils/helpers';

function FindFriends(props) {
  
  const [users, setUsers] = useState([]);
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
      const el = document.querySelector(".add.friend");
      el.innerHTML = response.status === 201 ? "Friend request sent" : "Add friend";
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchUsers();
  },[]);
  return (
    <div className="users">
      <Card>
        <Card.Content>
          <Card.Header>People you may know</Card.Header>
        </Card.Content>
        {users.map((user) => (
          <Card.Content key={user._id}>
            <Image
              floated='left'
              size='tiny'
              className='bg-avatar'
              src={user.avatar 
              ? _arrayBufferToUrl(user.avatar.data) 
              : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
            />
            <Card.Header>{user.firstname} {user.lastname}</Card.Header>
            <div className='buttons'>
              <Button className='add friend' compact floated='right'
                onClick={() => handleAddFriend(user._id)}>Add friend</Button>
            </div>
          </Card.Content>
        ))}
      </Card>
    </div>
  );
}
 
export default FindFriends;