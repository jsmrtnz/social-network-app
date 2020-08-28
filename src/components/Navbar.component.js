import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Image, Dropdown } from 'semantic-ui-react';
import { _arrayBufferToUrl } from '../utils/helpers';

export default function Navbar(props){
  const { user } = props;
  return (
    <div className="navbar">
      <Menu size='large' color='yellow' secondary>
        <Menu.Item header as={Link} to="/">Social Network</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='profile' as={Link} to={`/user/${user._id}`}>
              <Image 
                floated='left' size='mini' className='bg-avatar'
                src={user.avatar 
                  ? _arrayBufferToUrl(user.avatar.data) 
                  : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
              />{user.firstname}
          </Menu.Item>
          <Menu.Item name='home' as={Link} to="/"/>
          <Menu.Item name='findfriends' as={Link} to="/findfriends">
            <Icon name='users'/>
          </Menu.Item>
          <Dropdown icon='caret down' selectOnBlur={false}>
            <Dropdown.Menu>
              <Dropdown.Item text='Settings' icon='settings' as={Link} to="/settings"/>
              <Dropdown.Item text= 'Sign Out' icon='sign out' onClick={props.onLogout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </div>
  );
}