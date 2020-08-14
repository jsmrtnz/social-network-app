import React from "react";
import axios from 'axios';
import { Sidebar, Timeline} from './index';

class Home extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.handleAddFriend = this.handleAddFriend.bind(this);
  // }
  // handleAddFriend(){
    
  // }

  componentDidMount() {
    // Get friend requests
    (async () => {
      try {
        let requestsArray = [];
        const response = await axios.get('/fr');
        for (const request of response.data) {
          let user = await axios.get(`/user/meta?id=${request.from}`)
          requestsArray.push({_id: request._id, user: user.data});
        };
        this.props.onUpdateRequests(requestsArray);
      } catch (e) {
        console.log(e);
      }
    })();
    // Find people you may know
    (async () => {
      try {
        const response = await axios.get('/users?limit=5&skip=0');
        this.props.onUpdateUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }
  render() {
    const { user } = this.props;
    return (
      <div className='home'>
        <Timeline user={user} />
        <Sidebar {...this.props} />
      </div>
    );
  }
}
export default Home;