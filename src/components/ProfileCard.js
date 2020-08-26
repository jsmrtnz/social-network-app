import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';
import { _arrayBufferToUrl, getAge } from '../utils/helpers';
import { AuthContext } from '../state/auth-context';
import useForm from '../hooks/useForm';
import { Footer } from './index';

function ProfileCard(props) {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef(null);
  const uploadAvatar = async () => {
    try {
      const data = new FormData();
      data.append('avatar', inputs.avatar);
      const response = await axios.post('/avatar', data);
      props.onUpdateProfile(response.data);
      props.onUpdateUser(response.data);
      clearInputs();
    } catch(e) {
      console.log(e);
    }
  }
  const { inputs, handleInputChange, handleSubmit, clearInputs } = useForm({ avatar: '' }, uploadAvatar);
  const { profile } = props;
  let className = clicked ? '' : 'invisible';
  return (
    <React.Fragment>
      <Card className='profile'>
        <Image wrapped className='bg-avatar' src={profile.avatar 
          ? _arrayBufferToUrl(profile.avatar.data) 
          : (profile.gender === 'male' ? '/img/man.png' : '/img/woman.png')}/>
        <AuthContext.Consumer>
          {({userId}) => ( userId === props.profile._id &&
            <div className='picture'>
              <input className="upload-avatar" type='file' id='avatar' name='avatar' 
                onChange={(event) => {
                  handleInputChange(event);
                  setClicked(true);
                }} />
              <label htmlFor='avatar'><Icon name='photo' size='large' /></label>
              <Icon className={className} name='check' size='large' type='submit' 
                ref={inputRef} onClick={(e) => {
                  handleSubmit(e);
                  setClicked(false);
                }}/>
            </div>
          )}
        </AuthContext.Consumer>
        <Card.Content>
          <Card.Header>{profile.firstname} {profile.lastname}</Card.Header>
          <Card.Meta>
            <span className='date'>{getAge(profile.birthday)} years old</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/user/${profile._id}/friends`}>
            <Icon name='user'/>{profile.friends.length} Friends
          </Link>
        </Card.Content>
      </Card>
      <Footer/>
    </React.Fragment>
  );
}
export default ProfileCard;