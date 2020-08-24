import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Grid } from 'semantic-ui-react'
import { UserList } from './index';

function Friends(props) {
  const [friends, setFriends] = useState([]);
  const refsArray = [];
  const { user } = props;
  const fetchFriends = async () => {
    try {
      const response = await axios.get(`/friends?id=${user._id}`);
      setFriends(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleDeleteFriend = async (id, index) => {
    try {
      await axios.delete(`/friend?id=${id}`);
      setFriends(friends.filter(friend => friend._id !== id));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchFriends();
  },[]);
  return (
    <Grid centered>
      <Grid.Column width={12} className="users">
        <Card>
          <Card.Content>
            <Card.Header>{user.firstname}'s friends</Card.Header>
          </Card.Content>
          <UserList profile={user} users={friends} ref={refsArray} imageSize={'tiny'} action={"Delete friend"}
            onClick={(id, index) => handleDeleteFriend(id, index)} />
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default Friends;