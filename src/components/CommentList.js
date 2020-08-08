import React from 'react';
import { Comment } from 'semantic-ui-react';

function CommentList(props) {
  return (
    <div>
      <Comment.Group collapsed={props.collapsed} size='small'>
        <Comment>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Christian Rocha</Comment.Author>
            <Comment.Metadata>
              <span>2 days ago</span>
            </Comment.Metadata>
            <Comment.Text>
              I'm very interested in this motherboard. Do you know if it'd
              work in a Intel LGA775 CPU socket?
            </Comment.Text>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <span>1 day ago</span>
            </Comment.Metadata>
            <Comment.Text>No, it wont</Comment.Text>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Avatar
            as='a'
            src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
          />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <span>20 minutes ago</span>
            </Comment.Metadata>
            <Comment.Text>Maybe it would.</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default CommentList;