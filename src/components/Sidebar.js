import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { _arrayBufferToUrl } from '../utils/helpers';
import { FriendRequest, Footer } from './index';

function SideBar (props) {
  
  // const [requests, setRequests] = useState([]);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
    // Get friend requests
    // (async () => {
    //   try {
    //     const response = await axios.get('/fr');
    //     for (const request of response.data) {
    //       let user = await axios.get(`/user/meta?id=${request.from}`)
    //       setRequests(requests => [...requests, {_id: request._id, user: user.data}])
    //     };
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
    // // Find people you may know
    // (async () => {
    //   try {
    //     const response = await axios.get('/users?limit=5&skip=0');
    //     setUsers(response.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
  // },[]);
  
  const handleFriendRequest = (id) => {
    // setRequests(requests => requests.filter(request => request._id != id))
    const { requests } = props.user;
    props.onUpdateRequests(requests.filter(request => request._id != id))
  }
  const handleAddFriend = async (id) => {
    try {
      const response = await axios.post(`/fr?id=${id}`);
    } catch (e) {
      console.log(e);
    }
  }
  const { user, users } = props;
  return (
    <div className='sidebar'>
      <Card>
        <Card.Content className='requests'>
          <Card.Header>Friend Requests</Card.Header>
        </Card.Content>
        {user.requests.map((request) => (
          <FriendRequest key={request._id} {...request} onResponse={handleFriendRequest} />
        ))}
        {user.requests.length === 0 &&
          <Card.Content>
            <Card.Description>
              No friends requests... That's ok. Try <Link to="/findfriends">finding friends</Link>.
            </Card.Description>
          </Card.Content>
        }
        <Card.Content className='requests'>
          <Card.Header>People you may know</Card.Header>
        </Card.Content>
        {users.map((user) => (
          <Card.Content key={user._id}>
            <Image
              floated='left'
              size='mini'
              className='bg-avatar'
              src={user.avatar 
              ? _arrayBufferToUrl(user.avatar.data) 
              : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
            />
            <Card.Header>{user.firstname} {user.lastname}</Card.Header>
            <div className='buttons'>
              <Button compact floated='right' size='mini' color='grey' content='Add friend' 
                onClick={() => handleAddFriend(user._id)} />
            </div>
          </Card.Content>
        ))}
      </Card>
      <Footer />
    </div>
  );
}

export default SideBar;