import { handleActions } from 'redux-actions';
import axios from 'axios';

const GET_POST = 'subscribes/GET_POST';
const GET_POST_SUCCESS = 'subscribes/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'subscribes/GET_POST_FAILURE';

export const getPost = () => async (dispatch) => {
  dispatch({ type: GET_POST });

  try {
    const currentToken = sessionStorage.getItem('token');
    const response = await axios.get('subscribe', {
      headers: { Authorization: `Token ${currentToken}` },
    });

    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data.results,
    }); //요청 성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    }); //요청 실패, 에러 발생
    throw e; //나중에 컴포넌트단에서 에러를 조회할 수 있게 해줌
  }
};

const initialState = {
  loading: false,
  post: null,
};

const subscribes = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: true, //요청 시작
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
      loading: false, //요청 완료
    }),
    [GET_POST_FAILURE]: (state) => ({
      ...state,
      loading: false, //요청 완료
    }),
  },
  initialState,
);

//export default subscribes;
