import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar__logo">
        For<span>ge</span>
      </div>
      <ul className="navbar__links">
        <li><Link className="navbar__link" to="/">Home</Link></li>
        <li><Link className="navbar__link" to="/upload">Upload</Link></li>
        <li><Link className="navbar__link" to="/catalog">Catalog</Link></li>
        <li>
          <Link className="navbar__cta" to="/upload">Get Started</Link>
        </li>
      </ul>
    </motion.nav>
  );
}
