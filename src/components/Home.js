import React from "react";
import SideBar from './Sidebar';
import Timeline from "./Timeline";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.handleAddFriend = this.handleAddFriend.bind(this);
  }
  handleAddFriend(){
    
  }
  render() {
    // const isAuth = this.props.isAuth;
    return (
      <div className='home'>
        <Timeline user={this.props.user} />
        <SideBar user={this.props.user} />
      </div>
    );
  }
}
export default Home;