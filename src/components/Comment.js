import React, { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Comment, Button } from 'semantic-ui-react';
import useForm from '../hooks/useForm';
import { AuthContext } from '../state/auth-context';
import { _arrayBufferToUrl, _timeAgo } from '../utils/helpers';

function MyComment(props) {
  const inputRef = useRef(null);
  const { comment } = props;

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments?id=${comment._id}`);
      props.onDelete(comment._id)
    } catch(e) {
      console.log(e);
    }
  }
  const handleUpdate = async () => {
    try {
      const {data: { _id, content }} = await axios.patch('/comments', { _id: comment._id, ...inputs });
      props.onUpdate(_id, content);
    } catch(e) {
      console.log(e);
    }
  }
  const setMetadata = () => {
    if(comment.createdAt < comment.updatedAt){
      return _timeAgo(comment.updatedAt) + ' - Edited';
    }
    return _timeAgo(comment.createdAt);
  }
  const enableEdit = () => {
    inputRef.current.classList.remove("disabled");
    inputRef.current.focus();
  }
  const { inputs, handleInputChange } = useForm({ content: comment.content });
  return (
    <Comment>
      <Comment.Avatar as='a' src={comment.author.avatar
        ? _arrayBufferToUrl(comment.author.avatar.data) 
        : (comment.author.gender === "male" ? '/img/man.png' : '/img/woman.png')} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/user/${comment.author._id}`}>
          {comment.author.firstname} {comment.author.lastname}
        </Comment.Author>
        <Comment.Metadata>
          <span>{setMetadata()}</span>
          <AuthContext.Consumer>
            {({userId}) => ( userId === comment.author._id &&
              <React.Fragment>
                <Button as='a' onClick={enableEdit}>Edit</Button>&nbsp;-&nbsp;
                <Button as='a' onClick={handleDelete}>Delete</Button>
              </React.Fragment>
            )}
          </AuthContext.Consumer>
        </Comment.Metadata>
        <Comment.Text>
          <input type="text" className='comment-content disabled' name='content' 
            value={inputs.content}
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                inputRef.current.classList.add("disabled");
                inputRef.current.blur();
                handleUpdate();
              }
            }} 
          />
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

export default MyComment;