import React, { useEffect } from 'react';
import axios from 'axios';
import useForm from '../hooks/useForm';

function NewPost(props) {
  useEffect(() => {
    window.customInputFile();    
  });
  const newPost = async () => {
    try {
      const response = await axios.post('/posts', inputs);
      // , { headers: {
      //   'Authorization': 'Bearer ' + props.token
      // }}
      props.onSubmitPost(response.data);
      clearInputs();
    } catch(e) {
      console.log(e);
    }
  }
  const {inputs, handleInputChange, handleSubmit, clearInputs} = useForm({content: '', imgPost: 'Add Photo'}, newPost);
  return (
    <div className="post">
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea className="post-textarea" placeholder={"What's on your mind, " + props.user.firstname +"?"} name="content" value={inputs.content} onChange={handleInputChange}></textarea>
        <div className="post-inputs">
          <input className="input-file" type="file" id="fileToUpload" name="imgPost" onChange={handleInputChange}/>
          <label htmlFor="fileToUpload">{inputs.imgPost}</label>
          <input className="post-submit" type="submit" value="Post" name="submit"/>
        </div>
      </form>
    </div>
  );
}

export default NewPost;