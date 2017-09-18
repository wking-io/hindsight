import { gql } from 'react-apollo';

export const ALL_FORESIGHTS = gql`
  query AllForesights {
    allForesights(orderBy: order_ASC) {
      id
      action
      status
    }
  }
`;

export const CREATE_FORESIGHT = gql`
  mutation CreateForesight($action: String!, $userId: ID!, $order: Int!) {
    createForesight(action: $action, userId: $userId, order: $order) {
      id
      action
      status
      order
      user {
        id
      }
    }
  }
`;

export const DELETE_FORESIGHT = gql`
  mutation DeleteForesight($id: ID!) {
    deleteForesight(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_FORESIGHT = gql`
  mutation UpdateForesight($action: String!, $status: String!, $id: ID!) {
    updateForesight(action: $action, status: $status, id: $id) {
      id
      action
      status
      order
    }
  }
`;

export const UPDATE_FORESIGHT_ORDER = gql`
  mutation UpdateForesightOrder($order: Int!, $id: ID!) {
    updateForesight(order: $order, id: $id) {
      id
      order
    }
  }
`;
