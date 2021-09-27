const REGISTER_STATE = {
  initialState: {
    userid: '',
    password: '',
    name: '',
    email: '',
    gender: '',
    birthYear: new Date().getFullYear(),
  },
  errorState: {
    userid: '',
    password: '',
    name: '',
    email: '',
    birthYear: '',
  },
};

export default REGISTER_STATE;
