import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import Icon from './Icon';
import { FlexWrapper, FlexItem } from './Layout';
import { BodyText, Divider } from './Typography';
import MemberValue from './MemberValue';
import { ICONS } from '../lib/constants';
import { ALL_MEMBERS } from './Members';

class MemberData extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState;
  }

  initState = {
    name: this.props.member.name,
    role: this.props.member.role,
    email: this.props.member.email,
    readOnly: true,
  };

  toggleUpdate = () => {
    this.setState(prevState => ({ readOnly: !prevState.readOnly }));
  };

  deleteThisMember = () => {
    const id = this.props.member.id;
    this.props.deleteMember(id);
  };
  render() {
    const { member } = this.props;
    const { readOnly } = this.state;
    return (
      <FlexWrapper align="center" spread>
        <MemberValue type="text" value={member.name} readOnly={readOnly} />
        <Divider visible={readOnly}>{'//'}</Divider>
        <MemberValue type="text" value={member.role} readOnly={readOnly} />
        <Divider visible={readOnly}>{'//'}</Divider>
        <MemberValue type="text" value={member.email} readOnly={readOnly} />
        <div>
          <Icon icon={readOnly ? ICONS.EDIT : ICONS.SAVE} action={this.toggleUpdate} />
          <Icon
            type="negative"
            icon={readOnly ? ICONS.DELETE : ICONS.CANCEL}
            action={this.deleteThisMember}
          />
        </div>
      </FlexWrapper>
    );
  }
}

export const DELETE_MEMBER = gql`
  mutation DeleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($name: String!, $email: String!, $role: String!, $id: ID!) {
    updateMember(name: $name, email: $email, role: $role, id: $userId) {
      id
      name
      role
      email
    }
  }
`;

export default compose(
  graphql(DELETE_MEMBER, {
    props: ({ mutate }) => ({
      deleteMember: id =>
        mutate({
          variables: { id },
          update: (store, { data: { deleteMember } }) => {
            const data = store.readQuery({ query: ALL_MEMBERS });
            data.allMembers = data.allMembers.filter(member => member.id !== deleteMember.id);
            store.writeQuery({ query: ALL_MEMBERS, data });
          },
        }),
    }),
  }),
  graphql(UPDATE_MEMBER, { name: 'updateMember' }),
)(MemberData);
