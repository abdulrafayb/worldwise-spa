import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/login' className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

/* here we use a link and not a nav link because we don't want to add any special styles when this is selected */
