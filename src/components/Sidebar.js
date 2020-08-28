import React from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { FriendRequest, UserList } from './index';

function SideBar(props) {
  const { user, users } = props;
  const refsArray = [];
  const handleFriendRequest = (id) => {
    props.onUpdateRequests(user.requests.filter(request => request._id !== id))
  }
  const handleAddFriend = async (id, index) => {
    try {
      const response = await axios.post(`/fr?id=${id}`);
      refsArray[index].ref.current.textContent = response.status === 201 ? "Friend request sent" : "Add friend";
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
        <UserList profile={user} users={users} ref={refsArray} imageSize={'mini'} action={"Add friend"}
            onClick={(id, index) => handleAddFriend(id, index)} />
      </Card>
    </div>
  );
}

export default SideBar;