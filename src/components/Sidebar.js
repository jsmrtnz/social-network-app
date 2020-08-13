import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {_arrayBufferToUrl} from '../js/utils';
import FriendRequest from './FriendRequest';
import Footer from './Footer';

function SideBar (props) {
  
  const [frs, setFrs] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Get friend requests
    (async () => {
      try {
        const response = await axios.get('/fr');
        for (const fr of response.data) {
          let user = await axios.get(`/user/meta?id=${fr.from}`)
          setFrs(frs => [...frs, {_id: fr._id, user: user.data}])
        };
      } catch (e) {
        console.log(e);
      }
    })();
    // Find people you may know
    (async () => {
      try {
        const response = await axios.get('/users?limit=5&skip=0');
        setFriends(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  },[]);
  
  const handleResponseFr = (id) => {
    setFrs(frs => frs.filter(fr => fr._id != id))
  }

  return (
    <div className='sidebar'>
      <Card>
        <Card.Content className='requests'>
          <Card.Header>Friend Requests</Card.Header>
        </Card.Content>
        {frs.map((fr) => (
          <FriendRequest key={fr._id} {...fr} onResponse={handleResponseFr} />
        ))}
        {frs.length === 0 &&
          <Card.Content>
            <Card.Description>
              No friends requests... That's ok. Try <Link to="/findfriends">finding friends</Link>.
            </Card.Description>
          </Card.Content>
        }
        <Card.Content className='requests'>
          <Card.Header>People you may know</Card.Header>
        </Card.Content>
        {friends.map((friend) => (
          <Card.Content key={friend._id}>
            <Image
              floated='left'
              size='mini'
              className='bg-avatar'
              src={friend.avatar 
              ? _arrayBufferToUrl(friend.avatar.data) 
              : (friend.gender === "male" ? '/img/man.png' : '/img/woman.png')}
            />
            <Card.Header>{friend.firstname} {friend.lastname}</Card.Header>
            <div className='buttons'>
              <Button compact floated='right' size='mini' color='grey' content='Add friend' />
            </div>
          </Card.Content>
        ))}
      </Card>
      <Footer />
    </div>
  );
}

export default SideBar;