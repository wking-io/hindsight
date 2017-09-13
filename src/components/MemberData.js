import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import Icon from './Icon';
import { FlexWrapper, FlexItem } from './Layout';
import { BodyText, Divider } from './Typography';
import { ICONS } from '../lib/constants';
import { ALL_MEMBERS } from './Members';

const MemberData = ({ member, deleteMember, updateMember }) => {
  const toggleUpdate = () => console.log('edit');
  const deleteMem = () => {
    const id = member.id;
    console.log(id);
    deleteMember(id);
  };

  return (
    <FlexWrapper>
      <BodyText>
        <strong>{member.name}</strong>
      </BodyText>
      <Divider>{'//'}</Divider>
      <BodyText>{member.role}</BodyText>
      <Divider>{'//'}</Divider>
      <FlexItem>
        <BodyText>{member.email}</BodyText>
      </FlexItem>
      <Icon icon={ICONS.EDIT} action={toggleUpdate} />
      <Icon type="negative" icon={ICONS.DELETE} action={deleteMem} />
    </FlexWrapper>
  );
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
