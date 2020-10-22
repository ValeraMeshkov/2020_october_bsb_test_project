/**
 *  Функция преобразовывает телефон в строку в формате +1 (111) 111-1111
 *  @param {Number} num - Номер телефона
 */
export function formatPhone(num) {
  return `+1 ${String(num)
    .replace(/[^0-9]/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`;
}

/**
 *  Функция преобразовывает строку в формат 'Adwfwe Vedwedwe Adewdwe'
 *  @param {Number} str - Номер телефона
 */
export function everyFirstLetterUpp(str) {
  return str
    .split(" ")
    .map(el => (el ? `${el[0].toUpperCase()}${el.slice(1)}` : ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
