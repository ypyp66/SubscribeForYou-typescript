export type updateSubscribeStates = {
  i_name: string;
  purchase_day: number | string;
  price: number | string;
};

export type loginUserStates = {
  userid: string;
  password: string;
};

export type registerUserStates = loginUserStates & {
  name: string;
  email: string;
  gender: string;
  birthYear: number;
};
