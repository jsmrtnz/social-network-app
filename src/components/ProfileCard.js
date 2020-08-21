import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';
import { _arrayBufferToUrl, getAge } from '../utils/helpers';

function ProfileCard(props) {
  const { user } = props;
  return (
    <Card>
      <Image wrapped className='bg-avatar' src={user.avatar 
        ? _arrayBufferToUrl(user.avatar.data) 
        : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}/>
      <Card.Content>
        <Card.Header>{user.firstname} {user.lastname}</Card.Header>
        <Card.Meta>
          <span className="date">{getAge(user.birthday)} years old</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/user/${user._id}/friends`}>
          <Icon name='user'/>{user.friends.length} Friends
        </Link>
      </Card.Content>
    </Card>
  );
}
export default ProfileCard;