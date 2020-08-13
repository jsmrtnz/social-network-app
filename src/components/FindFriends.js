import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

function FindFriends(props) {
  
  return (
    <div className="users">
      <Card>
        <Card.Content>
          <Card.Header>People you may know</Card.Header>
        </Card.Content>
      </Card>
      {/* {friends.map((friend) => (
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
      ))} */}
    </div>
  );
}
 
export default FindFriends;