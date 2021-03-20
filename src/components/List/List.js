import { useHistory } from 'react-router-dom';

import s from './List.module.css';

export default function List(props) {
  const { title, data } = props;
  const history = useHistory();

  const clickHandler = (id) => {
    const { location, push } = history;

    push(`${location.pathname}/${id}`);
  };

  return (
    <div className={s.ListContainer}>
      {title && <div className={s.ListTitle}>{title}</div>}

      <div className={s.ListContent}>
        {data.map((item) => (
          <div className={s.ListItem} onClick={() => clickHandler(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
