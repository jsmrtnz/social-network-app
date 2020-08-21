import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { _arrayBufferToUrl } from '../utils/helpers';

export default function Navbar(props){
  const { user, activeItem } = props;
  return (
    <div className="navbar">
      <Menu size='large' color='yellow' pointing secondary>
        <Menu.Item header as={Link} to="/">Social Network</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='profile' active={activeItem === 'profile'} as={Link} to={`/user/${user._id}`}
            onClick={props.onItemClick}>
              <Image 
                floated='left' size='mini' className='bg-avatar'
                src={user.avatar 
                  ? _arrayBufferToUrl(user.avatar.data) 
                  : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
              />{user.firstname}
          </Menu.Item>
          <Menu.Item name='home' active={activeItem === 'home'} as={Link} to="/"
            onClick={props.onItemClick}/>
          <Menu.Item name='findfriends' active={activeItem === 'findfriends'} as={Link} to="/findfriends"
            onClick={props.onItemClick}>
            <Icon name='users'/>
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={props.onLogout} />
        </Menu.Menu>
      </Menu>
    </div>
  );
}