import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, Message } from 'semantic-ui-react';
import useForm from '../hooks/useForm';

function Settings(props) {
  const { user } = props;
  const [data, setData] = useState(user);
  const [message, setMessage] = useState({ text: '', visible: false, status: '' });
  useEffect(() => {
    setData(user);
  }, [user]);
  const updateProfile = async () => {
    try {
      const response = await axios.patch('/profile', inputs);
      props.onSubmit(response.data);
      setMessage({ visible: true, status: 'success', text: 'Your profile was saved successfully!' });
    } catch(e) {
      setMessage({ visible: true, status: 'error', text: 'There was some errors with your submission!' });
    }
  }
  const handleDismiss = () => {
    setMessage({ ...message, visible: false });
  }
  const {inputs, handleInputChange, handleSubmit} = useForm({
    firstname: data.firstname, 
    lastname: data.lastname, 
    email: data.email, 
    password: '', 
    birthday: data.birthday.split("T")[0],  
    gender: data.gender}, updateProfile);
  return (
    <Grid centered>
      <Grid.Column width={12} className='settings'>
        <Card>
          <Card.Content>
            <form onSubmit={handleSubmit} className="profile">
              <h1 className="page-title">Edit Profile</h1>
              {message.visible &&
                <Message className={message.status} header={message.text} onDismiss={handleDismiss} />
              }
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
              <div className="form-label">Date of birth</div>
              <input className="form-input" type="date" name="birthday"
                  value={inputs.birthday} onChange={handleInputChange} required/>
              <div className="form-label">Gender</div>
              <select className="form-input" name='gender' value={inputs.gender} 
                onChange={handleInputChange}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
              <button type="submit" className="save">Save Profile</button>
            </form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
 
export default Settings;