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

const initialState = {
  loading: false,
  users: [],
  filteredUsers: [],
  searchTerm: "",
  error: "",
  sortBy: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case SEARCH_USERS:
      const searchTerm = action.payload.toLowerCase();
      const filteredUsers = state.users.filter(
        (user) => user.name.toLowerCase().includes(searchTerm)
        // || user.email.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        searchTerm,
        filteredUsers,
      };

    case SORT_USERS:
      const { field, order } = action.payload;
      const sortedUsers = [...state.users].sort((a, b) => {
        const val1 = field === "company" ? a.company.name : a[field];
        const val2 = field === "company" ? b.company.name : b[field];
        return order === "asc"
          ? val1.localeCompare(val2)
          : val2.localeCompare(val1);
      });

      return {
        ...state,
        users: sortedUsers,
      };

    case RESET_SORT:
      return {
        ...state,
        users: [...state.users],
        sortBy: "",
        order: "",
      };

    default:
      return state;
  }
};

export default userReducer;
