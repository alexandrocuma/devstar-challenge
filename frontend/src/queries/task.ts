import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      step
      description
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String, $description: String) {
    createTask(title: $title, description: $description) {
      task {
        id
        title
        description
        step
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: String!
    $step: String
    $title: String
    $description: String
  ) {
    updateTask(id: $id, step: $step, title: $title, description: $description) {
      task {
        id
        step
        title
        description
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      success
    }
  }
`;
