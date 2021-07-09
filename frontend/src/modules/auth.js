const SET_USER = 'auth/SET_USER';
const SET_TOKEN = 'auth/SET_TOKEN';
const SET_PK = 'auth/SET_PK';

export const setUser = (user) => ({ type: SET_USER, user });
export const setToken = (token) => ({ type: SET_TOKEN, token });
export const setPk = (pk) => ({ type: SET_PK, pk });

const initialState = {
  user: null,
  token: null,
  pk: null,
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
    case SET_PK:
      return {
        ...state,
        pk: action.pk,
      };
    default:
      return state;
  }
}

export default reducer;
