import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
  }

  handleInputChange({ target: { name, value }}) {
    this.props.onSignUpInputChange(name, value)
  }

  handleGenderChange(event) {
    this.props.onGenderChange(event.target.value)
  }

  render() {
    const { firstname, lastname, email, password, birthday, gender } = this.props.user;
    return (
      <div className="main">
        <div className="flex-container">
          <div className="signup-container">
            <form onSubmit={this.props.onSignUpSubmit} className="formsection">
              <h1>Social Network</h1>
              <p>Please fill in this form to create an account.</p>
              <div className="form-label">First name</div>
              <input className="form-input" type="text" name="firstname" 
                  value={firstname} onChange={this.handleInputChange} required/>
              <div className="form-label">Last name</div>
              <input className="form-input" type="text" name="lastname" 
                  value={lastname} onChange={this.handleInputChange} required/>
              <div className="form-label">Email address</div>
              <input className="form-input" type="text" name="email" 
                  value={email} onChange={this.handleInputChange} required/>
              <div className="form-label">Password</div>
              <input className="form-input" type="password" name="password" 
                  value={password} onChange={this.handleInputChange} required/>
              <div className="signup-options">
                <div className="form-label">Date of birth</div>
                <input className="form-input" type="date" name="birthday" id="birthday" 
                    value={birthday} onChange={this.handleInputChange} required/>
              </div>
              <div className="signup-options m-10">
                <div className="form-label">Gender</div>
                <input type="radio" id="male" name="gender" value="male" 
                  checked={gender === "male"} onChange={this.handleGenderChange} />
                <label>Male</label>
                <input type="radio" id="female" name="gender" value="female"
                  checked={gender === "female"} onChange={this.handleGenderChange} />
                <label>Female</label>
                <input type="radio" id="other" name="gender" value="other"
                  checked={gender === "other"} onChange={this.handleGenderChange} />
                <label>Other</label>
              </div>
              <button type="submit" className="btn">Sign Up</button>
            </form>
          </div>
          <div className="help-container">
            <p><a href="/login">Already have an account? Log In.</a></p>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Signup;