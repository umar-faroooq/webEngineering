import { constants } from '../../utils/constants';
import './GitHubStats.css';

const GitHubStats = () => {
  const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
  const theme = isLightTheme ? 'default' : 'dracula'; // or 'radical', 'tokyonight'
  const bgColor = isLightTheme ? 'ffffff' : '16163a';
  const titleColor = isLightTheme ? '1a1a2e' : 'e8e8f0';
  const textColor = isLightTheme ? '555577' : '8888aa';
  const iconColor = '6c63ff'; // accent-primary

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${constants.GITHUB_USERNAME}&show_icons=true&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&icon_color=${iconColor}&border_color=6c63ff33&border_radius=15`;
  
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${constants.GITHUB_USERNAME}&theme=${theme}&background=${bgColor}&ring=${iconColor}&fire=${iconColor}&currStreakLabel=${textColor}&border=6c63ff33&border_radius=15`;
  
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${constants.GITHUB_USERNAME}&layout=compact&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&border_color=6c63ff33&border_radius=15`;

  return (
    <section className="github-stats-section section-padding">
      <h2 className="section-title animate-on-scroll fade-up">GitHub Activity</h2>
      
      <div className="stats-grid">
        <div className="stat-card animate-on-scroll fade-right">
          <img src={statsUrl} alt={`${constants.GITHUB_USERNAME} GitHub Stats`} />
        </div>
        <div className="stat-card animate-on-scroll fade-left">
          <img src={langsUrl} alt={`${constants.GITHUB_USERNAME} Top Languages`} />
        </div>
        <div className="stat-card full-width animate-on-scroll fade-up">
          <img src={streakUrl} alt={`${constants.GITHUB_USERNAME} GitHub Streak`} />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
