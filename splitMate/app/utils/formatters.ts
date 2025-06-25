export function formatCurrency(value: string): string {
  const numeric = value.replace(/\D/g, '');
  const float = (parseInt(numeric || '0', 10) / 100).toFixed(2);
  return `R$ ${float.replace('.', ',')}`;
}
export function formatDate(value: string): string {
  const numeric = value.replace(/\D/g, '').slice(0, 8); // no máximo 8 dígitos

  const day = numeric.slice(0, 2);
  const month = numeric.slice(2, 4);
  const year = numeric.slice(4, 8);

  let formatted = '';
  if (day) formatted += day;
  if (month) formatted += '/' + month;
  if (year) formatted += '/' + year;

  return formatted;
}