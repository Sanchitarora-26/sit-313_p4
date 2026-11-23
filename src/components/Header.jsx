import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const goToSection = (section) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <Link className="brand" to="/">DEV@Deakin/Chitkara</Link>
      <nav aria-label="Main navigation">
        <button type="button" onClick={() => goToSection('about')}>About</button>
        <button type="button" onClick={() => goToSection('articles')}>Articles</button>
        <button type="button" onClick={() => goToSection('tutorials')}>Tutorials</button>
        <button type="button" onClick={() => goToSection('newsletter')}>Newsletter</button>
        <button type="button" onClick={() => goToSection('contact')}>Contact</button>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;
