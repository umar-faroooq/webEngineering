import { profileData } from '../../data/profileData';
import { FiAward, FiCalendar } from 'react-icons/fi';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="education-section section-padding">
      <h2 className="section-title animate-on-scroll fade-up">Education</h2>
      
      <div className="timeline">
        {profileData.education.map((edu, index) => (
          <div 
            key={index} 
            className={`timeline-item animate-on-scroll ${index % 2 === 0 ? 'fade-right' : 'fade-left'}`}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{edu.degree}</h3>
                <span className="timeline-date">
                  <FiCalendar /> {edu.period}
                </span>
              </div>
              <h4 className="institution">
                <FiAward /> {edu.institution}
              </h4>
              <p>{edu.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
