import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm';

function Login(props) {
  const history = useHistory();
  const loginUser = async () => {
    try {
      const response = await axios.post('/login', inputs);
      props.onSubmit(response.data);
      history.push('/');
    } catch(e) {
      console.log(e);
    }
  }
  const {inputs, handleInputChange, handleSubmit} = useForm({email: '', password: ''}, loginUser);
  return (
    <div className="flex-container">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="formsection">
          <h1>Social Network</h1>
          <div className="form-label">Email</div>
          <input className="form-input" type="text" name="email"
                value={inputs.email} onChange={handleInputChange} required/>
          <div className="form-label">Password</div>
          <input className="form-input" type="password" name="password" 
                value={inputs.password} onChange={handleInputChange} required/>
          <button type="submit" className="btn">Login</button>
          <div className="login-separator">
              <span className="separator-title">OR</span>
          </div>
          <button type="submit" className="btn loginwith">Login with Facebook</button>
          <button type="submit" className="btn loginwith">Login with Github</button>
        </form>
      </div>
      <div className="help-container">
        <p><a href="/signup">Do not have an account? Sign up.</a></p>
      </div>
    </div>
  );
}

export default Login;