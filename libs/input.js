function percentMask(value) {
  let data = value;

  if (value.length === 1)
    data = value.replace(/(\d{1})/, (regex, arg) => `0.0${arg}%`);

  if (value.length === 2)
    data = value.replace(/(\d{2})/, (regex, arg) => `0.${arg}%`);

  if (value.length >= 3)
    data = value.replace(
      /(\d)(\d{2})$/,
      (regex, arg1, arg2) => `${arg1}.${arg2}%`
    );

  if (value === "NaN") data = "0.00%";

  return data;
}

function percent4Mask(value) {
  let data = value;

  if (value.length === 1)
    data = value.replace(/(\d{1})$/, (regex, arg) => `0.000${arg}%`);

  if (value.length === 2)
    data = value.replace(/(\d{2})$/, (regex, arg) => `0.00${arg}%`);

  if (value.length === 3)
    data = value.replace(/(\d{3})$/, (regex, arg) => `0.0${arg}%`);

  if (value.length === 4)
    data = value.replace(/(\d{4})$/, (regex, arg) => `0.${arg}%`);

  if (value.length > 4)
    data = value.replace(
      /(\d)(\d{4})$/,
      (regex, arg1, arg2) => `${arg1}.${arg2}%`
    );

  return data;
}

function isLetter(value) {
  let isLetter = true;

  for (const letter of value) {
    const code = letter.charCodeAt(0);
    if (code > 47 && code < 58) isLetter = false;
  }

  return isLetter;
}

function dateMask(value) {
  let data = null;

  if (value.length <= 2)
    data = value.replace(/(\d{2})/, (regex, arg1) => `${arg1}/`);

  if (value.length > 2 && value.length < 8)
    data = value.replace(
      /(\d{2})(\d{2})/,
      (regex, arg1, arg2) => `${arg1}/${arg2}/`
    );

  if (value.length === 3)
    data = value.replace(
      /(\d{2})(\d{1})/,
      (regex, arg1, arg2) => `${arg1}/${arg2}`
    );

  if (value.length >= 8)
    data = value.replace(
      /(\d{2})(\d{2})(\d{4})/,
      (regex, arg1, arg2, arg3) => `${arg1}/${arg2}/${arg3}`
    );

  return data;
}
