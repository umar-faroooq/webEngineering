import { useTypewriter } from '../../hooks/useTypewriter';
import { profileData } from '../../data/profileData';
import { FiDownload, FiArrowDown } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const currentRole = useTypewriter(profileData.roles);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <p className="hero-greeting fade-up-hero" style={{ animationDelay: '0.2s' }}>
          Hello, I'm
        </p>
        <h1 className="hero-name fade-up-hero" style={{ animationDelay: '0.4s' }}>
          Ghulam Muhammad{' '}
          <span className="hero-name-highlight">Kabir</span>
        </h1>
        <h2 className="hero-role fade-up-hero" style={{ animationDelay: '0.6s' }}>
          I am a <span className="typewriter-text">{currentRole}</span>
          <span className="typewriter-cursor">|</span>
        </h2>
        <p className="hero-tagline fade-up-hero" style={{ animationDelay: '0.8s' }}>
          Transforming ideas into scalable, modern web & mobile solutions.
        </p>

        <div className="hero-cta fade-up-hero" style={{ animationDelay: '1s' }}>
          <a href="#contact" className="hero-btn hero-btn-primary">
            Let's Connect
          </a>
          <a href="/resume.pdf" download className="hero-btn hero-btn-secondary">
            Resume <FiDownload />
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator fade-up-hero" style={{ animationDelay: '1.4s' }}>
        <a href="#about">
          <span>Scroll to explore</span>
          <FiArrowDown className="hero-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
