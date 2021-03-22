import PropTypes from 'prop-types';

import s from './CategoryFilter.module.css';

import Checkbox from '../../CheckBox';

const categories = [
  { id: 1, name: 'c1' },
  { id: 2, name: 'c2' },
  { id: 3, name: 'c3' },
  { id: 4, name: 'c4' },
  { id: 5, name: 'c5' },
  { id: 6, name: 'c6' },
  { id: 7, name: 'c7' },
];

export default function CategoryFilter(props) {
  const { selected, onToggleCategory } = props;

  const toggleHandler = ({ status, item }) => {
    let updated_selected = [];

    if (status) {
      updated_selected = [...selected, item];
    } else {
      updated_selected = selected.filter((s) => s !== item);
    }

    onToggleCategory(updated_selected);
  };

  return (
    <div className={s.CategoryFilterContainer}>
      <div>Categories: </div>

      {categories.map((category) => (
        <Checkbox
          key={category.id}
          value={category.name}
          defaultChecked={selected.includes(category.name)}
          onToggle={(status) => toggleHandler({ status, item: category.name })}
        />
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  selected: PropTypes.array,
  onToggleCategory: PropTypes.func.isRequired,
};
