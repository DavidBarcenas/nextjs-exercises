import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

import classes from './main-navigation.module.css';

export default function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {
            session ? (
              <>
                <li>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link href='/auth'>Login</Link>
              </li>
            )
          }
        </ul>
      </nav>
    </header>
  );
}