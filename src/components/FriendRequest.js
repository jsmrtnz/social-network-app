import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import axios from 'axios';
import {_arrayBufferToUrl} from '../js/utils';

function FriendRequest(props) {
  const handleResponse = async (res) => {
    try {
      await axios.delete(`/fr?id=${props._id}&v=${res}`);
      props.onResponse(props._id);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Card.Content>
      <Image
        floated='left'
        size='mini'
        className='bg-avatar'
        src={props.user.avatar 
        ? _arrayBufferToUrl(props.user.avatar.data) 
        : (props.user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
      />
      <Card.Header>{props.user.firstname} {props.user.lastname}</Card.Header>
      <div className='buttons'>
        <Button compact floated='right' size='mini' content='Decline' 
          onClick={() => handleResponse('declined')} />
        <Button compact floated='right' size='mini' content='Accept' 
          onClick={() => handleResponse('accepted')} />
      </div>
    </Card.Content>
  );
}

export default FriendRequest;