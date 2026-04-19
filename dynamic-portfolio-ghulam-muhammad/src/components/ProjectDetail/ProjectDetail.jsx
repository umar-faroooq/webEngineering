import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const images = project.projectImages || [];
  const hasImages = images.length > 0;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="project-detail-overlay" onClick={onClose} onKeyDown={handleKeyDown} tabIndex="0">
      <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        {/* Gallery Section */}
        {hasImages ? (
          <div className="detail-gallery">
            <div className="image-container">
              <img
                src={images[currentImageIndex].url}
                alt={`${project.name} - ${currentImageIndex + 1}`}
                className="detail-image"
              />
              {images.length > 1 && (
                <>
                  <button className="nav-btn prev-btn" onClick={goToPrevious} aria-label="Previous image">
                    <FiChevronLeft />
                  </button>
                  <button className="nav-btn next-btn" onClick={goToNext} aria-label="Next image">
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="image-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <p className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div>
        ) : (
          <div className="no-images">
            <p>No images available for this project</p>
          </div>
        )}

        {/* Project Info */}
        <div className="detail-info">
          <h2 className="detail-title">{project.name.replace(/[-_]/g, ' ')}</h2>

          <p className="detail-description">
            {project.description || 'No description provided.'}
          </p>

          <div className="detail-stats">
            <div className="stat">
              <span className="stat-label">Language:</span>
              <span className="stat-value">{project.language || 'Not specified'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Stars:</span>
              <span className="stat-value">{project.stargazers_count}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Forks:</span>
              <span className="stat-value">{project.forks_count}</span>
            </div>
          </div>

          <div className="detail-links">
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="detail-link">
                <FiExternalLink /> View Live
              </a>
            )}
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="detail-link">
              <FiGithub /> View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
