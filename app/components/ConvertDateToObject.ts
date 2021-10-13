export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const WeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ConvertDateToObject(dte: string) {
  const date = new Date(dte);
  //console.log(date);
  const d = date.getDate();
  const month = Months[date.getMonth()];
  const year = date.getFullYear();
  const Day = WeekDays[date.getDay()];

  return {
    date: d,
    day: Day,
    year: year,
    month: month,
  };
}
