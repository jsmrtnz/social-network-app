import React, { useState, useRef } from 'react';
import { Card, Image, Icon, Button, Container, Dropdown, Input, Form } from 'semantic-ui-react';
import axios from 'axios';
import useForm from '../hooks/useForm';
import CommentList from './CommentList';
import {_arrayBufferToUrl} from '../js/utils';

function Post(props) {
  const [options, setOptions] = useState({ 
    liked: false, 
    content: 'View comments',
    collapsed: true
  });
  const inputRef = useRef(null);
  const handleClickLike = () => {
    setOptions({ ...options, liked: !options.liked });
    document.activeElement.blur();
    handleLike();
  }
  const handleViewComments = () => {
    setOptions({ ...options, 
      collapsed: !options.collapsed, 
      content: options.content === 'View comments' ? 'Hide comments' : 'View comments' 
    });
    document.activeElement.blur();
  }
  const handleLike = async () => {
    try {
      const {data: {_id, owner}} = await axios.post('/posts/like', { _id: props._id } );
      props.onLike(_id, owner);
    } catch(e) {
      console.log(e);
    }
  }
  const handleDeletePost = async () => {
    try {
      const {data: {_id}} = await axios.delete(`/posts?id=${props._id}`);
      props.onDelete(_id)
    } catch(e) {
      console.log(e);
    }
  }
  const handleUpdatePost = async () => {
    try {
      const {data: { _id, content }} = await axios.patch(`/posts?id=${props._id}`, inputs);
      props.onUpdate( _id, content);
    } catch(e) {
      console.log(e);
    }
  }
  const handleInputUpdate = () => {
    inputRef.current.classList.remove("disabled");
    inputRef.current.focus();
  }
  const {inputs, handleInputChange} = useForm({ content: props.content });

  function isObject(obj) {
    return obj === Object(obj);
  }
  const user = isObject(props.owner) ? props.owner : props.user;
  return (
    <div className="post">
      <Card fluid>
        {user._id === props.user._id &&
          <Dropdown icon='ellipsis vertical' direction='left'>
            <Dropdown.Menu>
              <Dropdown.Item text='Edit' onClick={handleInputUpdate} />
              <Dropdown.Item text='Delete' onClick={handleDeletePost} />
            </Dropdown.Menu>
          </Dropdown>
        }
        <Card.Content>
          <Image 
            floated='left'
            size='mini'
            className='bg-avatar'
            src={user.avatar 
              ? _arrayBufferToUrl(user.avatar.data) 
              : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
          />
          <Card.Header>{user.firstname}</Card.Header>
          <Card.Meta>
            <span>{user.lastname}</span>
          </Card.Meta>
          {props.content && 
            <Card.Description>
              <input type="text" className='post-content disabled' name='content' 
                value={inputs.content} 
                ref={inputRef}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    inputRef.current.classList.add("disabled");
                    inputRef.current.blur();
                    handleUpdatePost();
                  }
                }} 
              />
            </Card.Description>
          }
        </Card.Content>
        <Container>
          <Image fluid src={props.image 
            ? _arrayBufferToUrl(props.image.data) 
            : ''} />
        </Container>
        <Container className='contrast' fluid>
          <Button.Group floated='left' size='small'>
            <Button className='action' toggle active={options.liked} onClick={handleClickLike} animated='vertical'>
              <Button.Content hidden>{props.likes.length} likes</Button.Content>
              <Button.Content visible>
                <Icon name='thumbs up'/>Like
              </Button.Content>
            </Button>
            <Button className='action' onClick={handleViewComments} animated='vertical'>
              <Button.Content hidden>3 comments</Button.Content>
              <Button.Content visible>
                <Icon name='comments'/>{options.content}
              </Button.Content>
            </Button>
          </Button.Group>
        </Container>
        <Card.Content className='contrast'>
          <CommentList collapsed={options.collapsed} />
          <Form>
            <Input fluid action={{ content: 'Post', className: 'comment' }} placeholder='Write a comment...' />
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Post;