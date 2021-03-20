import { useHistory } from 'react-router-dom';

import s from './List.module.css';

export default function List({ data }) {
  const history = useHistory();

  const clickHandler = (id) => {
    const { location, push } = history;

    push(`${location.pathname}/${id}`);
  };

  return (
    <div className={s.ListContainer}>
      {data.map((item) => (
        <div key={item.id} className={s.ListItem} onClick={() => clickHandler(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
