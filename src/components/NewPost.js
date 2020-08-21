import React, { useEffect } from 'react';
import axios from 'axios';
import useForm from '../hooks/useForm';
import { customInputFile } from '../utils/helpers';

function NewPost(props) {
  useEffect(() => {
    customInputFile();
  });
  const newPost = async () => {
    try {
      const data = new FormData();
      data.append('content', inputs.content);
      data.append('post', inputs.post);
      const response = await axios.post('/posts', data);
      // , { headers: {
      //   'Authorization': 'Bearer ' + props.token
      // }}
      props.onSubmitPost(response.data);
      clearInputs();
    } catch(e) {
      console.log(e);
    }
  }
  const {inputs, handleInputChange, handleSubmit, clearInputs} = useForm({content: '', imgLabel: 'Add Photo'}, newPost);
  return (
    <div className="new-post">
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea className="post-textarea" placeholder={"What's on your mind, " + props.user.firstname +"?"} name="content" value={inputs.content} onChange={handleInputChange}></textarea>
        <div className="post-inputs">
          <input className="input-file" type="file" id="fileToUpload" name="post" onChange={handleInputChange}/>
          <label htmlFor="fileToUpload">{inputs.imgLabel}</label>
          <input className="post-submit" type="submit" value="Post" name="submit"/>
        </div>
      </form>
    </div>
  );
}

export default NewPost;