import { useState, useEffect } from 'react';
import { constants } from '../utils/constants';

// Function to fetch multiple images from repo using GitHub API
const fetchProjectImages = async (repo) => {
  const images = [];
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  
  const headers = { 
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-app'
  };
  
  // Add authorization header if token is available
  if (constants.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${constants.GITHUB_TOKEN}`;
  }
  
  try {
    // Fetch root directory
    const response = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/`,
      { headers }
    );
    
    if (response.status === 403) {
      console.warn('GitHub API rate limit reached. Please add a token in .env file.');
      return [];
    }
    
    if (response.ok) {
      const contents = await response.json();
      
      if (Array.isArray(contents)) {
        // Get root level images
        for (const item of contents) {
          if (item.type === 'file' && imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext))) {
            images.push({
              name: item.name,
              url: item.download_url,
              path: item.path
            });
          }
        }
      }
    }
    
    // Try images subdirectories if no images found
    if (images.length === 0) {
      for (const subdir of ['images', 'screenshots', 'assets', 'public']) {
        try {
          const subResponse = await fetch(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/${subdir}`,
            { headers }
          );
          
          if (subResponse.ok) {
            const subContents = await subResponse.json();
            if (Array.isArray(subContents)) {
              for (const item of subContents) {
                if (item.type === 'file' && imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext))) {
                  images.push({
                    name: item.name,
                    url: item.download_url,
                    path: item.path
                  });
                  if (images.length >= 5) break;
                }
              }
            }
          }
          if (images.length >= 5) break;
        } catch (err) {
          // Silent fail for subdirectories
        }
      }
    }
  } catch (err) {
    console.error(`Error fetching images for ${repo.name}:`, err);
  }

  return images;
};

export const useGitHub = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'portfolio-app'
        };
        
        // Add authorization header if token is available
        if (constants.GITHUB_TOKEN) {
          headers['Authorization'] = `token ${constants.GITHUB_TOKEN}`;
        }
        
        // Fetch profile
        const profileRes = await fetch(
          `https://api.github.com/users/${constants.GITHUB_USERNAME}`,
          { headers }
        );
        
        if (profileRes.status === 404) {
          throw new Error(`GitHub user "${constants.GITHUB_USERNAME}" not found`);
        }
        
        if (profileRes.status === 403) {
          throw new Error('GitHub API rate limited. Wait a while or add a token in .env file (VITE_GITHUB_TOKEN).');
        }
        
        if (!profileRes.ok) {
          throw new Error(`Failed to fetch profile: ${profileRes.statusText}`);
        }
        
        const profileData = await profileRes.json();
        
        // Fetch repos
        const reposRes = await fetch(
          `https://api.github.com/users/${constants.GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          { headers }
        );
        
        if (!reposRes.ok) {
          if (reposRes.status === 403) {
            throw new Error('GitHub API rate limited on repos call. Wait a while or add a token.');
          }
          throw new Error(`Failed to fetch repos: ${reposRes.statusText}`);
        }
        
        const reposData = await reposRes.json();
        
        if (!Array.isArray(reposData)) {
          throw new Error('Invalid repos data format');
        }
        
        // Filter out forks and profile repo
        let filteredRepos = reposData.filter(repo => 
          !repo.fork && repo.name !== constants.GITHUB_USERNAME
        ).slice(0, 12); // Limit to 12 repos

        // Fetch project images for each repo
        const reposWithImages = await Promise.allSettled(
          filteredRepos.map(async (repo) => {
            const projectImages = await fetchProjectImages(repo);
            
            return {
              ...repo,
              projectImages: projectImages,
              projectImage: projectImages.length > 0 ? projectImages[0].url : null
            };
          })
        );

        // Filter out failed promises
        const successfulRepos = reposWithImages
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        setProfile(profileData);
        setRepos(successfulRepos);
        
        if (successfulRepos.length === 0) {
          setError('No repositories found.');
        }
      } catch (err) {
        console.error('GitHub fetch error:', err);
        setError(err.message || 'Failed to load GitHub data');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return { profile, repos, loading, error };
};
