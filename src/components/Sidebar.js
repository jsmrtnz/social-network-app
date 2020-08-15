import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { _arrayBufferToUrl } from '../utils/helpers';
import { FriendRequest, Footer } from './index';

function SideBar(props) {
  const { user, users } = props;
  const handleFriendRequest = (id) => {
    props.onUpdateRequests(user.requests.filter(request => request._id != id))
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
  return (
    <div className='sidebar'>
      <Card>
        <Card.Content className='requests'>
          <Card.Header>Friend Requests</Card.Header>
        </Card.Content>
        {user.requests.map((request) => (
          <FriendRequest key={request._id} {...request} onResponse={handleFriendRequest} />
        ))}
        {user.requests.length === 0 &&
          <Card.Content>
            <Card.Description>
              No friends requests... That's ok. Try <Link to="/findfriends">finding friends</Link>.
            </Card.Description>
          </Card.Content>
        }
        <Card.Content className='requests'>
          <Card.Header>People you may know</Card.Header>
        </Card.Content>
        {users.map((user) => (
          <Card.Content key={user._id}>
            <Image
              floated='left'
              size='mini'
              className='bg-avatar'
              src={user.avatar 
              ? _arrayBufferToUrl(user.avatar.data) 
              : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
            />
            <Card.Header>{user.firstname} {user.lastname}</Card.Header>
            <div className='buttons'>
              <Button className='add friend' compact floated='right' size='mini'
                onClick={() => handleAddFriend(user._id)}>Add friend</Button>
            </div>
          </Card.Content>
        ))}
      </Card>
      <Footer />
    </div>
  );
}

export default SideBar;