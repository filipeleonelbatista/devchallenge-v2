export function cutStringToMaxValue(text, maxLength = 50) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

export const isStringEmpty = (text) => {
  return text === "";
};

export const yearNow = (date) => {
  const newDate = new Date(date).getFullYear();
  const currentDate = new Date(Date.now()).getFullYear();
  return currentDate - newDate;
};

export const pad = (num) => {
  return num < 10 ? "0" + num : num;
};

export const dateToStringInput = (date) => {
  const newDate = new Date(date);
  const dateString = `${newDate.getFullYear()}-${pad(
    newDate.getMonth() + 1
  )}-${pad(newDate.getDate())}`;
  return dateString;
};

export const dateToString = (date) => {
  const newDate = new Date(date);
  const dateString = `${pad(newDate.getDate())}/${pad(
    newDate.getMonth() + 1
  )}/${newDate.getFullYear()}`;
  return dateString;
};

export const dateToStringFull = (date) => {
  const newDate = new Date(date);
  const dateString = `${pad(newDate.getDate())}/${pad(
    newDate.getMonth() + 1
  )}/${newDate.getFullYear()} ${pad(newDate.getHours())}:${pad(
    newDate.getMinutes()
  )}`;
  return dateString;
};

export const stringToDate = (str) => {
  const date_regex = /^\d{2}\/\d{2}\/\d{4}$/;

  const isMatch = date_regex.test(str);

  if (isMatch) {
    const currentStrDate = str.split("/");
    return new Date(
      currentStrDate[2],
      Number(currentStrDate[1]) - 1,
      currentStrDate[0]
    );
  }
  return "NAD";
};

export function celular(value) {
  var valueNumber = parseInt(value.replace(/\D/g, ""));
  var newValue = valueNumber.toString().replace(/\D/g, "");
  newValue = newValue.replace(/^(\d{2})(\d)/g, "($1) $2");
  newValue = newValue.replace(/(\d)(\d{4})$/, "$1-$2");

  return newValue;
}

export const cep = (value) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

export const cpf = (value) => {
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
  }
  return value;
};

export function cnpj(value) {
  if (!value.match(/^(\d{2}).(\d{3}).(\d{3})\\(\d{4})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  }
  return value;
}
