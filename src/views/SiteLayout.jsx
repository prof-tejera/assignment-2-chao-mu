import { Link, Outlet } from "react-router-dom";

const SiteLayout = () => {
  return (
    <>
      <header>
        <h1>Timers by Autumn</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Timers</Link>
            </li>
            <li>
              <Link to="/add">Add Timer</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Thank you!</footer>
    </>
  );
};

export default SiteLayout;
