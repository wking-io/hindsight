import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import Icon from '../shared/Icon';
import { PushLastChild } from '../shared/Layout';
import { Divider } from '../shared/Typography';
import EditableCard from '../shared/EditableCard';
import MemberValue from './MemberValue';
import ICONS from '../../utils/icons';
import { ALL_MEMBERS, UPDATE_MEMBER, DELETE_MEMBER } from '../../lib/queries/members';

const MemberData = ({ member, deleteMember, updateMember }) => (
  <EditableCard data={member} deleteThis={deleteMember} updateThis={updateMember}>
    {(memberData, updateIsOpen, update) => {
      const { name, role, email } = memberData;
      return (
        <PushLastChild align="center" spread="5">
          <MemberValue
            type="text"
            name="name"
            value={name}
            updateIsOpen={updateIsOpen}
            updateValue={update.track}
          />
          <Divider visible={!updateIsOpen}>{'//'}</Divider>
          <MemberValue
            type="text"
            name="role"
            value={role}
            updateIsOpen={updateIsOpen}
            updateValue={update.track}
          />
          <Divider visible={!updateIsOpen}>{'//'}</Divider>
          <MemberValue
            type="text"
            name="email"
            value={email}
            updateIsOpen={updateIsOpen}
            updateValue={update.track}
          />
          <div>
            <Icon
              icon={updateIsOpen ? ICONS.SAVE : ICONS.EDIT}
              action={updateIsOpen ? update.submit : update.toggle}
            />
            <Icon
              type="negative"
              icon={updateIsOpen ? ICONS.CANCEL : ICONS.DELETE}
              action={updateIsOpen ? update.cancel : update.delete}
            />
          </div>
        </PushLastChild>
      );
    }}
  </EditableCard>
);

MemberData.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  deleteMember: PropTypes.func.isRequired,
  updateMember: PropTypes.func.isRequired,
};

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
  graphql(UPDATE_MEMBER, {
    props: ({ mutate }) => ({
      updateMember: ({ name, role, email, id }) =>
        mutate({
          variables: { name, role, email, id },
          optimisticResponse: {
            __typename: 'Mutation',
            updateMember: {
              __typename: 'Member',
              id,
              name,
              role,
              email,
            },
          },
        }),
    }),
  }),
)(MemberData);
