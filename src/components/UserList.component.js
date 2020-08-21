import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import { _arrayBufferToUrl } from '../utils/helpers';

const UserList = React.forwardRef((props, refsArray) => {
  return (
    <React.Fragment>
      {props.users.map((user, i) => (
        <Card.Content key={user._id}>
          <Image
            floated="left"
            size={props.imageSize}
            className="bg-avatar"
            src={user.avatar 
            ? _arrayBufferToUrl(user.avatar.data) 
            : (user.gender === "male" ? "/img/man.png" : "/img/woman.png")}
          />
          <Card.Header>{user.firstname} {user.lastname}</Card.Header>
          <div className="buttons">
            <Button ref={el => { refsArray[i] = el}} compact floated="right" content={props.action}
              onClick={() => props.onClick(user._id, i)} />
          </div>
        </Card.Content>
      ))}
    </React.Fragment>
  );
});
export default UserList;