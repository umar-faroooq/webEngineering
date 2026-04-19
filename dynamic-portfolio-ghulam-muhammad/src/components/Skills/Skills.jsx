import { profileData } from '../../data/profileData';
import { FaReact, FaNodeJs, FaPython, FaFigma, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiExpress, SiCplusplus, SiFirebase, SiVercel, SiPostman, SiFlutter } from 'react-icons/si';
import { TbBrandReactNative, TbBrandCSharp } from 'react-icons/tb';
import { DiVisualstudio } from 'react-icons/di';
import './Skills.css';

const iconMap = {
  "React.js": <FaReact />,
  "JavaScript (ES6+)": <SiJavascript />,
  "HTML5/CSS3": null,
  "Tailwind CSS": <SiTailwindcss />,
  "Node.js": <FaNodeJs />,
  "Express.js": <SiExpress />,
  "Python": <FaPython />,
  "C#": <TbBrandCSharp />,
  "C++": <SiCplusplus />,
  "React Native": <TbBrandReactNative />,
  "Flutter": <SiFlutter />,
  "Firebase": <SiFirebase />,
  "Git/GitHub": <FaGitAlt />,
  "Vercel": <SiVercel />,
  "VS Code": <DiVisualstudio />,
  "Postman": <SiPostman />,
  "Figma": <FaFigma />
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section section-padding">
      <h2 className="section-title animate-on-scroll fade-up">Technical Skills</h2>
      
      <div className="skills-container">
        {Object.entries(profileData.skills).map(([category, skillsList], index) => (
          <div 
            key={category} 
            className="skill-category animate-on-scroll fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="category-title">{category.replace('_', ' / ')}</h3>
            <div className="skills-grid">
              {skillsList.map((skill) => (
                <div key={skill} className="skill-item">
                  <span className="skill-icon">{iconMap[skill] || <div className="dot"></div>}</span>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
