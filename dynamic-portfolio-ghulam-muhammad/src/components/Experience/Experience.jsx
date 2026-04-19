import { profileData } from '../../data/profileData';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience-section section-padding">
      <h2 className="section-title animate-on-scroll fade-up">Experience</h2>
      
      <div className="experience-container">
        {profileData.experience.map((exp, index) => (
          <div key={index} className="experience-card animate-on-scroll fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="exp-header">
              <div className="exp-title">
                <FiBriefcase className="exp-icon" />
                <h3>{exp.role}</h3>
              </div>
              <span className="exp-date">
                <FiCalendar /> {exp.period}
              </span>
            </div>
            
            <h4 className="company-name">{exp.company}</h4>
            <p className="exp-description">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
