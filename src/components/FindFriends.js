import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Grid } from 'semantic-ui-react'
import { UserList } from './index';

function FindFriends() {
  const [users, setUsers] = useState([]);
  const refsArray = [];
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleAddFriend = async (id, index) => {
    try {
      const response = await axios.post(`/fr?id=${id}`);
      refsArray[index].ref.current.textContent = response.status === 201 ? "Friend request sent" : "Add friend";
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchUsers();
  },[]);
  return (
    <Grid centered>
      <Grid.Column width={12} className="users">
        <Card>
          <Card.Content>
            <Card.Header>People you may know</Card.Header>
          </Card.Content>
          <UserList users={users} ref={refsArray} imageSize={'tiny'} action={"Add friend"}
            onClick={(id, index) => handleAddFriend(id, index)} />
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default FindFriends;