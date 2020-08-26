import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Image, Icon, Button, Container, Dropdown, Input, Form } from 'semantic-ui-react';
import useForm from '../hooks/useForm';
import { AuthContext } from '../state/auth-context';
import { CommentList } from './index';
import { _arrayBufferToUrl, _timeAgo } from '../utils/helpers';

function Post(props) {
  const auth = useContext(AuthContext);
  const [options, setOptions] = useState({ 
    liked: false, 
    content: 'View comments',
    collapsed: true
  });
  const inputRef = useRef(null);
  const { post } = props;
  const setMetadata = () => {
    if(post.createdAt < post.updatedAt){
      return _timeAgo(post.updatedAt) + ' - Edited';
    }
    return _timeAgo(post.createdAt);
  }
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
      const {data: {_id, owner}} = await axios.post('/posts/like', { _id: post._id } );
      props.onLike(_id, owner);
    } catch(e) {
      console.log(e);
    }
  }
  const handleDeletePost = async () => {
    try {
      const {data: {_id}} = await axios.delete(`/posts?id=${post._id}`);
      props.onDelete(_id)
    } catch(e) {
      console.log(e);
    }
  }
  const handleUpdatePost = async () => {
    try {
      const {data: { _id, content }} = await axios.patch(`/posts?id=${post._id}`, inputs);
      props.onUpdate( _id, content);
    } catch(e) {
      console.log(e);
    }
  }
  const handleInputUpdate = () => {
    inputRef.current.classList.remove("disabled");
    inputRef.current.parentElement.classList.remove("no-content");
    inputRef.current.focus();
  }
  useEffect(() => {
    setOptions({ ...options, liked: post.likes.includes(auth.userId) ? true : false });
  },[]);
  const {inputs, handleInputChange} = useForm({ content: post.content });
  return (
    <div className="post">
      <Card fluid>
        <AuthContext.Consumer>
          {({userId}) => ( userId === post.owner._id &&
            <Dropdown icon='ellipsis vertical' direction='left'>
              <Dropdown.Menu>
                <Dropdown.Item text='Edit' onClick={handleInputUpdate} />
                <Dropdown.Item text='Delete' onClick={handleDeletePost} />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </AuthContext.Consumer>
        <Card.Content>
          <Image 
            floated='left'
            size='mini'
            className='bg-avatar'
            src={post.owner.avatar
              ? _arrayBufferToUrl(post.owner.avatar.data) 
              : (post.owner.gender === "male" ? '/img/man.png' : '/img/woman.png')}
          />
          <Card.Header as={Link} to={`/user/${post.owner._id}`}>
            {post.owner.firstname} {post.owner.lastname}
          </Card.Header>
          <Card.Meta>
            {setMetadata()}
          </Card.Meta>
          <Card.Description className={!post.content ? 'no-content' : ''}>
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
        </Card.Content>
        <Container>
          <Image fluid src={post.image 
            ? _arrayBufferToUrl(post.image.data) 
            : ''} />
        </Container>
        <Container className='contrast' fluid>
          <Button.Group floated='left' size='small'>
            <Button className='action' toggle onClick={handleClickLike} animated='vertical'
              active={options.liked}>
              <Button.Content hidden>{post.likes.length} likes</Button.Content>
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