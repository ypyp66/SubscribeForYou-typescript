import axios from 'axios';
import SESSION from '../constants/StorageKeys';

export const addSubscribeData = async (currentData) => {
  const data = {
    i_name: currentData.title,
    price: currentData.price,
    purchase_day: currentData.day,
    user_pk: sessionStorage.getItem(SESSION.PK),
  };

  const options = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem(SESSION.TOKEN)}`,
    },
  };

  try {
    const response = await axios.post('subscribe/', data, options);

    return response.status;
  } catch (e) {
    return e;
  }
};

export const removeSubscribeData = async (id) => {
  const options = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem(SESSION.TOKEN)}`,
    },
  };
  try {
    const response = await axios.delete(`subscribe/${id}`, options);
    return response.status;
  } catch (e) {
    return e;
  }
};

export const updateSubscribeData = async (id, data) => {
  const options = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem(SESSION.TOKEN)}`,
    },
  };

  try {
    const response = await axios.patch(`subscribe/${id}`, data, options);
    return response.status;
  } catch (e) {
    return e;
  }
};

export const logIn = async (currentUser) => {
  try {
    const result = await axios.post('auth/api/login', {
      user_id: currentUser.userid,
      password: currentUser.password,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const logOut = async () => {
  const currentToken = sessionStorage.getItem(SESSION.TOKEN);

  try {
    const response = await axios({
      url: 'auth/api/logout',
      method: 'post',
      headers: { Authorization: `Token ${currentToken}` },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const loadSubscribeDatas = async () => {
  const currentToken = sessionStorage.getItem(SESSION.TOKEN);

  try {
    const result = await axios.get('subscribe', {
      headers: { Authorization: `Token ${currentToken}` },
    });

    if (result.status === 200) {
      return result.data.results;
    }
  } catch (e) {
    return e;
  }
};

export const checkUserIsValid = async () => {
  const currentToken = sessionStorage.getItem(SESSION.TOKEN);
  const currentPK = sessionStorage.getItem(SESSION.PK);

  try {
    const result = await axios.get(`auth/api/user/${currentPK}`, {
      headers: { Authorization: `Token ${currentToken}` },
    });

    return result.data.user.user_id;
  } catch (e) {
    return e;
  }
};

export const searchSubscribeDatas = async (value) => {
  try {
    const response = await axios.get(`subscribe/search?keyword=${value}`);

    return response.data.results;
  } catch (e) {
    return e;
  }
};
