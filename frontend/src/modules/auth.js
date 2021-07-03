const SET_USER = 'auth/SET_USER';
const SET_TOKEN = 'auth/SET_TOKEN';

export const setUser = (user) => ({ type: SET_USER, user });
export const setToken = (token) => ({ type: SET_TOKEN, token });

const initialState = {
  user: null,
  token: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export default reducer;
