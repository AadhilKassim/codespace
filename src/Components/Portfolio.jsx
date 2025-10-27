/**
 * Portfolio component
 *
 * Highlights some of  your creations. These can be designs, websites,
 * open source contributions, articles you've written and more.
 *
 * This is a great area for you to to continually add to and refine
 * as you continue to learn and create.
 */

import React, { useEffect, useState } from "react";

/**
 * Desk image
 *
 * Below is a sample desk image. Feel free to update this to an image of your choice,
 * updating below imageAltText to string that represents what you see in that image.
 *
 * Need an image? Check out https://unsplash.com to download a photo you
 * freely use on your site.
 */
import image from "../images/design-desk.jpeg";

const imageAltText = "desktop with books and laptop";

/**
 * Project list
 *
 * An array of objects that will be used to display for your project
 * links section. Below is a sample, update to reflect links you'd like to highlight.
 */
// sample fallback projects (used if GitHub fetch fails or no username provided)
const projectList = [
  {
    title: "10 Things To Know About Azure Static Web Apps 🎉",
    description:
      "Collaboration to create a beginner friendly article to help explain Azure Static Web Apps and tooling to get started.",
    url: "https://dev.to/azure/10-things-to-know-about-azure-static-web-apps-3n4i",
  },
  {
    title: "Web Development for Beginners",
    description:
      "Contributed sketch note imagery to accompany each lesson. These help provide visual representation of what is being taught.",
    url: "https://github.com/microsoft/web-dev-for-beginners",
  },
  {
    title: "My Resume Site",
    description:
      "Created from Microsoft's resume workshop and deployed to GitHub pages. Includes my experience and design abilities.",
    url: "https://github.com/microsoft/workshop-library/tree/main/full/build-resume-website",
  },
  {
    title: "GitHub Codespaces and github.dev",
    description:
      "Video interview to explain when to use GitHub.dev versus GitHub Codespaces, and how best to use each tool.",
    url: "https://www.youtube.com/watch?v=c3hHhRME_XI",
  },
];

const Portfolio = ({ gitHub }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchRepos = async () => {
      if (!gitHub) return;
      setLoading(true);
      try {
        // Grab up to 100 repos and pick the top by stars as a proxy for pinned
        const res = await fetch(`https://api.github.com/users/${gitHub}/repos?per_page=100`);
        if (!res.ok) throw new Error("GitHub API error");
        const data = await res.json();
        const top = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)
          .map((r) => ({
            title: r.name,
            description: r.description || "",
            url: r.html_url,
          }));
        if (mounted) setRepos(top);
      } catch (e) {
        // leave repos empty to fall back to projectList
        // eslint-disable-next-line no-console
        console.error("Failed to fetch GitHub repos", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchRepos();
    return () => {
      mounted = false;
    };
  }, [gitHub]);

  const displayList = repos && repos.length ? repos : projectList;

  return (
    <section className="padding" id="portfolio">
      <h2 style={{ textAlign: "center" }}>Portfolio</h2>
      <div style={{ display: "flex", flexDirection: "row", paddingTop: "3rem" }}>
        <div style={{ maxWidth: "40%", alignSelf: "center" }}>
          <img
            src={image}
            style={{ height: "90%", width: "100%", objectFit: "cover" }}
            alt={imageAltText}
          />
        </div>
        <div className="container">
          {loading && <p className="small">Loading repositories...</p>}
          {displayList.map((project) => (
            <div className="box" key={project.title}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <h3 style={{ flexBasis: "40px" }}>{project.title}</h3>
              </a>
              <p className="small">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
