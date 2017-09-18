import { gql } from 'react-apollo';

export const ALL_MEMBERS = gql`
  query AllMembers {
    allMembers {
      id
      name
      role
      email
    }
  }
`;

export const CREATE_MEMBER = gql`
  mutation CreateMember($name: String!, $email: String!, $role: String!, $userId: ID!) {
    createMember(name: $name, email: $email, role: $role, userId: $userId) {
      id
      name
      role
      email
      user {
        id
      }
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation DeleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($name: String!, $role: String!, $email: String!, $id: ID!) {
    updateMember(name: $name, role: $role, email: $email, id: $id) {
      id
      name
      role
      email
    }
  }
`;
