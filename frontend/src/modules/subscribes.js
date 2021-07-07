const SET_SUBSCRIBEDATAS = 'subscribes/SET_SUBSCRIBEDATAS';

export const setSubscribeDatas = (datas) => ({
  type: SET_SUBSCRIBEDATAS,
  datas,
});

const initialState = {
  datas: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUBSCRIBEDATAS:
      return {
        ...state,
        datas: action.datas,
      };
    default:
      return state;
  }
}

export default reducer;
