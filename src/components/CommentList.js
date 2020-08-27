import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Comment, Input, Form } from 'semantic-ui-react';
import useForm from '../hooks/useForm';
import { MyComment } from './index';

function CommentList(props) {
  const [comments, setComments] = useState([]);
  const { inputs, handleInputChange, clearInputs } = useForm({ content: '' });
  const { post } = props;

  const fetchComments = async () => {
    try {
      let data = [];
      const response = await axios.get(`/comments?id=${post._id}`);
      for (const comment of response.data) {
        let author = await axios.get(`/user/meta?id=${comment.author}`);
        data.push({...comment, ...{author: author.data}});
      }
      setComments(data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleCreate = async () => {
    try {
      const { data: comment } = await axios.post('/comments', { _id: post._id, ...inputs });
      const { data: author } = await axios.get(`/user/meta?id=${comment.author}`);
      const newComments = comments.concat({ ...comment, ...{ author }});
      setComments(newComments);
      clearInputs();
    } catch(e) {
      console.log(e);
    }
  }
  const handleDelete = (id) => {
    const newComments = comments.filter(comment => comment._id !== id)
    setComments(newComments);
  }
  const handleUpdate = (id, content) => {
    const newComments = comments.map((comment) => {
      if (comment._id === id) {
        return { ...comment, content };
      }
      return comment;
    }); 
    setComments(newComments);
  }
  useEffect(() => {
    fetchComments();
  },[]);
  return (
    <div>
      <Comment.Group collapsed={props.collapsed} size='small'>
        {comments.map((comment) => (
          <MyComment key={comment._id} comment={comment} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </Comment.Group>
      <Form>
        <Input fluid name='content' placeholder='Write a comment...' value={inputs.content} onChange={handleInputChange}
          action={{ content: 'Post', className: 'comment-submit', onClick: handleCreate }} />
      </Form>
    </div>
  );
}

export default CommentList;