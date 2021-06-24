export const idValidation = (data) => {
    const Regex = /^[a-z]{1}[0-9a-z]+$/
    console.log(Regex.test(data));

    if (!Regex.test(data)) {
        return false;
    } else {
        return true;
    }
}

export const pwValidation = (data) => {
    const Regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/
    console.log(data)
    console.log(Regex.test(data));

    if (!Regex.test(data)) {
        return false;
    } else {
        return true;
    }
}