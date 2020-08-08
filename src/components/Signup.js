import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm';

function Signup(props) {
  const history = useHistory();
  const registerUser = async () => {
    try {
      const response = await axios.post('/signup', inputs);
      props.onSubmit(response.data);
      history.push('/');
    } catch(e) {
      console.log(e);
    }
  }
  const {inputs, handleInputChange, handleSubmit} = useForm({firstname: '', lastname: '', email: '', password: '', birthday: '', gender: ''}, registerUser);
  return (
    <div className="flex-container">
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="formsection">
          <h1>Social Network</h1>
          <p>Please fill in this form to create an account.</p>
          <div className="form-label">First name</div>
          <input className="form-input" type="text" name="firstname" 
              value={inputs.firstname} onChange={handleInputChange} required/>
          <div className="form-label">Last name</div>
          <input className="form-input" type="text" name="lastname" 
              value={inputs.lastname} onChange={handleInputChange} required/>
          <div className="form-label">Email address</div>
          <input className="form-input" type="text" name="email" 
              value={inputs.email} onChange={handleInputChange} required/>
          <div className="form-label">Password</div>
          <input className="form-input" type="password" name="password" 
              value={inputs.password} onChange={handleInputChange} required/>
          <div className="signup-options">
            <div className="form-label">Date of birth</div>
            <input className="form-input" type="date" name="birthday"
                value={inputs.birthday} onChange={handleInputChange} required/>
          </div>
          <div className="signup-options m-14">
            <div className="form-label">Gender</div>
            <input type="radio" name="gender" value="male" 
              checked={inputs.gender === "male"} onChange={handleInputChange} />
            <label>Male</label>
            <input type="radio" name="gender" value="female"
              checked={inputs.gender === "female"} onChange={handleInputChange} />
            <label>Female</label>
            <input type="radio" name="gender" value="other"
              checked={inputs.gender === "other"} onChange={handleInputChange} />
            <label>Other</label>
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
      </div>
      <div className="help-container">
        <p><a href="/login">Already have an account? Log In.</a></p>
      </div>
    </div>
  );
}
export default Signup;