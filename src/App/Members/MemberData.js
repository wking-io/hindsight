import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import Icon from '../shared/Icon';
import { PushLastChild } from '../shared/Layout';
import { Divider } from '../shared/Typography';
import MemberValue from './MemberValue';
import ICONS from '../../utils/icons';
import { ALL_MEMBERS } from './index';

class MemberData extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState;
  }

  initState = {
    name: this.props.member.name,
    role: this.props.member.role,
    email: this.props.member.email,
    readOnly: true
  };

  toggleUpdate = () => {
    this.setState(prevState => ({ readOnly: !prevState.readOnly }));
  };

  deleteThisMember = () => {
    const id = this.props.member.id;
    this.props.deleteMember(id);
  };

  submitUpdate = () => {
    const { name, role, email } = this.state;
    const { id } = this.props.member;
    this.props.updateMember(name, role, email, id);
    this.initState = { name, role, email, readOnly: true };
    this.toggleUpdate();
  };

  updateValue = e => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  cancelUpdate = () => {
    this.setState(() => this.initState);
  };

  render() {
    const { name, role, email } = this.state;
    const { readOnly } = this.state;
    return (
      <PushLastChild align="center" spread="5">
        <MemberValue
          type="text"
          name="name"
          value={name}
          readOnly={readOnly}
          updateValue={this.updateValue}
        />
        <Divider visible={readOnly}>{'//'}</Divider>
        <MemberValue
          type="text"
          name="role"
          value={role}
          readOnly={readOnly}
          updateValue={this.updateValue}
        />
        <Divider visible={readOnly}>{'//'}</Divider>
        <MemberValue
          type="text"
          name="email"
          value={email}
          readOnly={readOnly}
          updateValue={this.updateValue}
        />
        <div>
          <Icon
            icon={readOnly ? ICONS.EDIT : ICONS.SAVE}
            action={readOnly ? this.toggleUpdate : this.submitUpdate}
          />
          <Icon
            type="negative"
            icon={readOnly ? ICONS.DELETE : ICONS.CANCEL}
            action={readOnly ? this.deleteThisMember : this.cancelUpdate}
          />
        </div>
      </PushLastChild>
    );
  }
}

MemberData.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  deleteMember: PropTypes.func.isRequired,
  updateMember: PropTypes.func.isRequired
};

export const DELETE_MEMBER = gql`
  mutation DeleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $name: String!
    $role: String!
    $email: String!
    $id: ID!
  ) {
    updateMember(name: $name, role: $role, email: $email, id: $id) {
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
            data.allMembers = data.allMembers.filter(
              member => member.id !== deleteMember.id
            );
            store.writeQuery({ query: ALL_MEMBERS, data });
          }
        })
    })
  }),
  graphql(UPDATE_MEMBER, {
    props: ({ mutate }) => ({
      updateMember: (name, role, email, id) =>
        mutate({
          variables: { name, role, email, id },
          optimisticResponse: {
            __typename: 'Mutation',
            updateMember: {
              __typename: 'Member',
              id,
              name,
              role,
              email
            }
          }
        })
    })
  })
)(MemberData);
