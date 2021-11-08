import axios, { AxiosResponse } from "axios";
import { create_intialState } from "constants/Create";
import SESSION from "constants/StorageKeys";
import {
  loginUserStates,
  registerUserStates,
  updateSubscribeStates,
} from "./Types";

export const addSubscribeData = async (currentData: create_intialState) => {
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
    const response = await axios.post("subscribe/", data, options);

    return response.status;
  } catch (e) {
    return e;
  }
};

export const removeSubscribeData = async (id: number) => {
  const options = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem(SESSION.TOKEN)}`,
    },
  };
  try {
    const response: AxiosResponse = await axios.delete(
      `subscribe/${id}`,
      options,
    );
    return response.status;
  } catch (e) {
    return e;
  }
};

export const updateSubscribeData = async (
  id: number,
  data: updateSubscribeStates,
) => {
  const options = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem(SESSION.TOKEN)}`,
    },
  };

  try {
    const response: AxiosResponse = await axios.patch(
      `subscribe/${id}`,
      data,
      options,
    );
    return response.status;
  } catch (e) {
    return e;
  }
};

export const register = async (currentUser: registerUserStates) => {
  try {
    const result: AxiosResponse = await axios({
      url: "auth/api/user",
      method: "POST",
      data: {
        user_id: currentUser.userid,
        password: currentUser.password,
        u_name: currentUser.name,
        email: currentUser.email,
        gender: currentUser.gender,
        birth_year: currentUser.birthYear,
      },
    });

    return result;
  } catch (e) {
    console.log("error");
    return e;
  }
};

export const logIn = async (currentUser: loginUserStates) => {
  try {
    const result = await axios.post("auth/api/login", {
      user_id: currentUser.userid,
      password: currentUser.password,
    });

    return result;
  } catch (e) {
    return e;
  }
};

export const logOut = async () => {
  const currentToken = sessionStorage.getItem(SESSION.TOKEN);

  try {
    const response = await axios({
      url: "auth/api/logout",
      method: "post",
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
    const result = await axios.get("subscribe", {
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

export const searchSubscribeDatas = async (value: string) => {
  try {
    const response = await axios.get(`subscribe/search?keyword=${value}`);

    return response.data.results;
  } catch (e) {
    return e;
  }
};
