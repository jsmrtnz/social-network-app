import React, { useRef } from 'react';
import { Grid, Button, Card, Image } from 'semantic-ui-react'
import { _arrayBufferToUrl } from '../utils/helpers';

export default function UserList(props){
  return (
    <Grid centered>
      <Grid.Column width={12} className="users">
        <Card>
          <Card.Content>
            <Card.Header>{props.title}</Card.Header>
          </Card.Content>
          {props.users.map((user) => (
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
                <Button ref={props.setButtonRef} compact floated='right'
                  onClick={() => props.onClick(user._id)}>Add friend</Button>
              </div>
            </Card.Content>
          ))}
        </Card>
      </Grid.Column>
    </Grid>
  );
}