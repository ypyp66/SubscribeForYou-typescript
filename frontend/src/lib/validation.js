export const idValidation = (data) => {
  const Regex = /^[a-z]{1}[0-9a-z]+$/;

  if (!Regex.test(data)) {
    return {
      result: false,
      message: '아이디는 영어로 시작해야합니다.',
    };
  }

  return {
    result: true,
  };
};

export const pwValidation = (data) => {
  const Regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/;

  if (data.length < 8 || data.length > 15) {
    return {
      result: false,
      message: '비밀번호는 8~15자 입니다.',
    };
  }

  if (!Regex.test(data)) {
    return {
      result: false,
      message: '비밀번호는 영어/숫자/특수문자가 포함되어야합니다.',
    };
  }

  return { result: true, message: '' };
};

export const nameValidation = (data) => {
  const Regex = /^[가-힣]+$/;

  if (!Regex.test(data)) {
    console.log('false');
    return {
      result: false,
      message: '이름은 한글만 가능합니다.',
    };
  }

  return { result: true, message: '' };
};

export const emailValidation = (data) => {
  const Regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!Regex.test(data)) {
    console.log('false');
    return {
      result: false,
      message: '이메일 형식에 맞지 않습니다.',
    };
  }

  return { result: true, message: '' };
};

export const yearValidation = (data) => {
  const Regex = /^[0-9]{4}$/i;

  if (!Regex.test(data)) {
    console.log('false');
    return {
      result: false,
      message: '출생년도는 4자리입니다...',
    };
  } else {
    if (data > new Date().getFullYear()) {
      return {
        result: false,
        message: '미래에서 태어나셨나요?',
      };
    } else if (data < 0) {
      return {
        result: false,
        message: 'B.C에 태어나셨나요?',
      };
    }
  }

  return { result: true, message: '' };
};

export const subscribeTitleValidation = (data) => {
  const Regex = /^[가-힣\s]+$/g;

  if (!Regex.test(data)) {
    return {
      result: false,
      message: '서비스명은 한글로만 입력해주세요',
    };
  }

  return { result: true, message: '' };
};
