import { useEffect, useState } from 'react';

import s from './MonthFilter.module.css';

export default function MonthFilter(props) {
  const { selected, onSelectMonth } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(generateMonths());
  }, []);

  function generateMonths() {
    const month_names = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();

    let month_arr = [];

    for (let i = 0; i < 12; i++) {
      const id = ('0' + (month + 1)).slice(-2);

      month_arr.push({
        id,
        name: month_names[month] + ' ' + year,
      });

      if (++month === 12) {
        month = 0;
        year++;
      }
    }

    return month_arr;
  }

  const changeHandler = (ev) => {
    const value = ev.currentTarget.value;

    if (parseInt(value) === 0) {
      onSelectMonth(null);
      return;
    }

    onSelectMonth(ev.currentTarget.value);
  };

  return (
    <select className={s.Select} value={selected || 0} onChange={changeHandler}>
      <option value="0">Select a Month</option>

      {options &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
    </select>
  );
}
