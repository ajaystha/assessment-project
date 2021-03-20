import Logo from '../Logo';

import s from './Header.module.css';

export default function Header() {
  return (
    <header className={s.Header}>
      <div className={s.AppLogo}>
        <Logo />
      </div>
    </header>
  );
}
