import React from 'react';
import { Button, Card, Image, Container, Divider } from 'semantic-ui-react'
import {_arrayBufferToUrl} from '../js/utils';

import Footer from './Footer';

function FriendRequest (props) {
  const user = props.user;
  return (
    <div className='fr'>
      <Card>
        <Card.Content className='requests'>
          <Card.Header>Friend Requests</Card.Header>
        </Card.Content>
        <Card.Content>
          <Image
            floated='left'
            size='mini'
            // src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
            className='bg-avatar'
            src={user.avatar 
            ? _arrayBufferToUrl(user.avatar.data) 
            : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
          />
          <Card.Header>Steve Sanders</Card.Header>
          <div className='two buttons'>
            <Button compact floated='right' size='mini' color='grey' content='Decline' />
            <Button compact floated='right' size='mini' color='grey' content='Accept' />
          </div>
        </Card.Content>
        <Card.Content>
          <Card.Description>No friends requests... That's ok. Try <a href='#'>finding friends</a>.</Card.Description>
        </Card.Content>
        <Card.Content className='requests'>
          <Card.Header>People you may know</Card.Header>
        </Card.Content>
      </Card>
      <Footer />
    </div>
  );
}

export default FriendRequest;