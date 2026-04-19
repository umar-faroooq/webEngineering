import { useEffect, useRef, useState } from 'react';
import { useGitHub } from '../../hooks/useGitHub';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { MdImageNotSupported } from 'react-icons/md';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import VanillaTilt from 'vanilla-tilt';
import './Projects.css';

const ProjectCard = ({ repo, onClick }) => {
  const tiltRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const images = repo.projectImages || [];
  const displayImages = images.slice(0, 2);
  const remainingCount = Math.max(0, images.length - 2);

  useEffect(() => {
    if (tiltRef.current && !isFlipped) {
      VanillaTilt.init(tiltRef.current, {
        max: 12,
        speed: 300,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
      });
    }
    return () => {
      if (tiltRef.current?.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, [isFlipped]);

  return (
    <div
      ref={tiltRef}
      className={`project-card-3d ${isFlipped ? 'flipped' : ''}`}
      onClick={(e) => {
        if (!isFlipped) {
          setIsFlipped(true);
        } else {
          onClick();
        }
      }}
      style={{ cursor: 'pointer', animation: 'fadeInUp 0.8s ease forwards', opacity: 0 }}
    >
      {/* Front Side */}
      <div className="project-card-face project-card-front">
        <div className={`project-images-grid fb-layout fb-${Math.min(images.length, 4)}`}>
          {images.length === 0 ? (
            <div className="image-slot placeholder fb-empty">
              <div className="placeholder-icon">
                <FiGithub size={40} />
              </div>
            </div>
          ) : images.length === 1 ? (
             <div className="fb-item fb-full">
               <img src={images[0].url} alt={`${repo.name} 1`} className="project-thumb" />
             </div>
          ) : images.length === 2 ? (
             <>
               <div className="fb-item fb-half"><img src={images[0].url} alt={`${repo.name} 1`} className="project-thumb" /></div>
               <div className="fb-item fb-half"><img src={images[1].url} alt={`${repo.name} 2`} className="project-thumb" /></div>
             </>
          ) : images.length === 3 ? (
             <>
               <div className="fb-item fb-main"><img src={images[0].url} alt={`${repo.name} 1`} className="project-thumb" /></div>
               <div className="fb-col">
                 <div className="fb-item fb-quarter"><img src={images[1].url} alt={`${repo.name} 2`} className="project-thumb" /></div>
                 <div className="fb-item fb-quarter"><img src={images[2].url} alt={`${repo.name} 3`} className="project-thumb" /></div>
               </div>
             </>
          ) : (
             <>
               <div className="fb-item fb-main"><img src={images[0].url} alt={`${repo.name} 1`} className="project-thumb" /></div>
               <div className="fb-col">
                 <div className="fb-item fb-quarter"><img src={images[1].url} alt={`${repo.name} 2`} className="project-thumb" /></div>
                 <div className="fb-item fb-quarter fb-more">
                   <img src={images[2].url} alt={`${repo.name} 3`} className="project-thumb" />
                   {images.length > 3 && (
                     <div className="fb-overlay">
                       <span>+{images.length - 3}</span>
                     </div>
                   )}
                 </div>
               </div>
             </>
          )}
        </div>

        <div className="project-info">
          <div className="project-header-top">
            <h3 className="project-title">{repo.name.replace(/[-_]/g, ' ')}</h3>
            <div className="project-quick-links">
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-link"
                  onClick={(e) => e.stopPropagation()}
                  title="View Live"
                >
                  <FiExternalLink />
                </a>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="quick-link"
                onClick={(e) => e.stopPropagation()}
                title="View Repository"
              >
                <FiGithub />
              </a>
            </div>
          </div>

          <p className="project-description">
            {repo.description || 'A featured project from GitHub'}
          </p>

          <div className="project-meta">
            {repo.language && <span className="language-badge">{repo.language}</span>}
            <span className="stars-count"><AiOutlineStar /> {repo.stargazers_count}</span>
          </div>
        </div>
      </div>

      {/* Back Side - Details */}
      <div className="project-card-face project-card-back">
        <div className="back-content">
          <h3 className="back-title">Project Details</h3>
          <div className="back-stats">
            <div className="stat-item-back">
              <span className="stat-icon"><BiBookmark /></span>
              <span className="stat-label-back">Language</span>
              <span className="stat-value-back">{repo.language || 'N/A'}</span>
            </div>
            <div className="stat-item-back">
              <span className="stat-icon"><AiOutlineStar /></span>
              <span className="stat-label-back">Stars</span>
              <span className="stat-value-back">{repo.stargazers_count}</span>
            </div>
            <div className="stat-item-back">
              <span className="stat-icon"><FiGithub /></span>
              <span className="stat-label-back">Forks</span>
              <span className="stat-value-back">{repo.forks_count}</span>
            </div>
            <div className="stat-item-back">
              <span className="stat-icon"><MdImageNotSupported /></span>
              <span className="stat-label-back">Images</span>
              <span className="stat-value-back">{images.length}</span>
            </div>
          </div>
          <div className="back-note">
            <span>Click to see gallery &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { repos, loading, error } = useGitHub();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="projects-section section-padding">
        <h2 className="section-title animate-on-scroll fade-up">Featured Projects</h2>
        <p className="section-subtitle animate-on-scroll fade-up">Hover to flip • Click to view gallery</p>

        {loading && <div className="loader">Loading your awesome projects...</div>}
        {error && <div className="error">Error loading projects: {error}</div>}

        {!loading && !error && (
          <div className="projects-grid-3d">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  repo={repo}
                  onClick={() => setSelectedProject(repo)}
                />
              ))
            ) : (
              <div className="no-projects">No projects found</div>
            )}
          </div>
        )}
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};

export default Projects;
