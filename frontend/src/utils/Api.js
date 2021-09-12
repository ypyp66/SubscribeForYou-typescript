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
