import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { name, value }}){
    this.props.onLogInInputChange(name, value);
  }

  render() {
    const { email, password } = this.props.user;
    return (
      <div className="main">       
        <div className="flex-container">
          <div className="login-container">
            <form onSubmit={this.props.onLogInSubmit} className="formsection">
              <h1>Social Network</h1>
              <div className="form-label">Email</div>
              <input className="form-input" type="text" name="email"
                    value={email} onChange={this.handleInputChange} required/>
              <div className="form-label">Password</div>
              <input className="form-input" type="password" name="password" 
                    value={password} onChange={this.handleInputChange} required/>
              
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
      </div>
    );
  }
}

export default Login;