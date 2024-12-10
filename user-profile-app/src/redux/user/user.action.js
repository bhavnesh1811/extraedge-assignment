import axios from "axios";
import {
  DELETE_USER,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  RESET_SORT,
  SEARCH_USERS,
  SORT_USERS,
  UPDATE_USER,
} from "./user.actionTypes";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

//Search Users

export const searchUsers = (searchTerm) => ({
  type: SEARCH_USERS,
  payload: searchTerm
});

// Sort by company/email

export const sortUsers = (sortBy) => ({
  type: SORT_USERS,
  payload: sortBy
});

// Reset Sorting
export const resetSort = () => ({
  type: RESET_SORT
});

// Async Action Creator
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export const updateUser = (userData) => {
  return {
    type: UPDATE_USER,
    payload: userData
  };
};

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: { id: userId }
});

