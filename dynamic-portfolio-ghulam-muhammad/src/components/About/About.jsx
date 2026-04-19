import { profileData } from '../../data/profileData';
import { FiBookOpen, FiStar, FiMapPin } from 'react-icons/fi';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section section-padding">
      <h2 className="section-title animate-on-scroll fade-up">About Me</h2>
      
      <div className="about-content">
        <div className="about-image-container animate-on-scroll fade-right">
          <div className="about-image">
            <img 
              src={`/cyberpunk.png`} 
              alt="Ghulam Muhammad Kabir" 
            />
          </div>
          <div className="image-backdrop"></div>
        </div>
        
        <div className="about-text animate-on-scroll fade-left">
          <p className="bio">{profileData.bio}</p>
          
          <div className="highlights-grid">
            <div className="highlight-card">
              <FiBookOpen className="icon" />
              <h4>Education</h4>
              <p>BS Software Engineering</p>
              <p>CGPA: 3.97</p>
            </div>
            
            <div className="highlight-card">
              <FiStar className="icon" />
              <h4>Experience</h4>
              <p>Software Analysis Intern</p>
            </div>
            
            <div className="highlight-card">
              <FiMapPin className="icon" />
              <h4>Location</h4>
              <p>{profileData.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
