import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi';
import { constants } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FiGithub, url: `https://github.com/${constants.GITHUB_USERNAME}`, label: 'GitHub' },
    { icon: FiLinkedin, url: constants.LINKEDIN_URL, label: 'LinkedIn' },
    { icon: FiMail, url: `mailto:${constants.EMAIL}`, label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h3 className="footer-title">Ghulam Muhammad Kabir</h3>
          <p className="footer-description">Full-Stack Developer | Software Engineer | AI Enthusiast</p>
          <p className="footer-tagline">Building innovative solutions with clean code and cutting-edge technologies</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-section-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer-link">
                  <span>{link.label}</span>
                  <FiExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4 className="footer-section-title">Services</h4>
          <ul className="footer-links">
            <li><a href="#projects" className="footer-link"><span>Web Development</span></a></li>
            <li><a href="#projects" className="footer-link"><span>Mobile Apps</span></a></li>
            <li><a href="#projects" className="footer-link"><span>Full-Stack Solutions</span></a></li>
            <li><a href="#projects" className="footer-link"><span>Cloud Deployment</span></a></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-section footer-connect">
          <h4 className="footer-section-title">Connect With Me</h4>
          <div className="social-icons">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={social.label}
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Ghulam Muhammad Kabir. All rights reserved.
          </p>
          <p className="built-with">
            Built with <span className="heart">❤️</span> using React, Vite &amp; Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
