import React from 'react';
import { Grid, Card, Image, Icon } from 'semantic-ui-react';
import { PostListData, PostList } from './index';
import { _arrayBufferToUrl, getAge } from '../utils/helpers';

class Profile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Grid centered>
        <Grid.Column width={4}>
          <Card>
            <Image
                wrapped
                className='bg-avatar'
                src={user.avatar 
                ? _arrayBufferToUrl(user.avatar.data) 
                : (user.gender === "male" ? '/img/man.png' : '/img/woman.png')}
              />
            <Card.Content>
              <Card.Header>{user.firstname} {user.lastname}</Card.Header>
              <Card.Meta>
                <span className="date">{getAge(user.birthday)} years old</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {user.friends.length} Friends
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <PostListData 
            user={this.props.user} url={'posts'}
            render={({ ...props }) => <PostList {...props} />} />
        </Grid.Column>
      </Grid>
    );
  }
}
 
export default Profile;