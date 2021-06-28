import { React } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { setUser, setToken } from '../modules/auth';
import {useHistory} from 'react-router-dom';

function Navbar({ token }) {
  const history = useHistory();

  const onLogout = () => {
    console.log('logout');
    axios({
      url : 'auth/api/logout',
      method : 'post',
      headers : {'Authorization' : `Token ${token}`}
    })
    .then(res => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userid');
      setUser(null);
      setToken(null);
      
      history.push('/login');
    })
    .catch(e => alert('유효하지 않은 접근입니다'));

  }
  return (
    <div className='flex justify-end'>
      <button className='border p-2 text-base lg:text-xl rounded-md bg-blue-700 text-white'
      onClick={onLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default connect(
  (state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }),
  {
    setUser,
    setToken,
  },
)(Navbar);
