import { gql } from 'react-apollo';

export const ALL_MEMBERS = gql`
  query AllMembers {
    allMembers(orderBy: order_ASC) {
      id
      name
      role
      email
    }
  }
`;

export const CREATE_MEMBER = gql`
  mutation CreateMember(
    $name: String!
    $role: String!
    $email: String!
    $order: Int!
    $userId: ID!
  ) {
    createMember(name: $name, role: $role, email: $email, order: $order, userId: $userId) {
      id
      name
      role
      email
      order
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

export const UPDATE_MEMBER_ORDER = gql`
  mutation UpdateMemberOrder($order: Int!, $id: ID!) {
    updateMember(order: $order, id: $id) {
      id
      order
    }
  }
`;
