/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React, { useEffect, useState } from "react";

import About from "./Components/About";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Portfolio from "./Components/Portfolio";

import "./styles.css";

/**
 * This object represents your information. The project is set so that you
 * only need to update these here, and values are passed a properties to the
 * components that need that information.
 *
 * Update the values below with your information.
 *
 * If you don't have one of the social sites listed, leave it as an empty string.
 */
// You can set these via environment variables when building the app
// e.g. REACT_APP_GITHUB and REACT_APP_LINKEDIN. They will fall back to
// the placeholder values below if not provided.
const siteProps = {
  name: "Aadhil Kassim P N",
  title: "Full Stack Developer & C/C++ Developer",
  email: "aadhilkassim@tistcochin.edu.in",
  // Provided GitHub username — used by Portfolio to fetch your repos
  gitHub: process.env.REACT_APP_GITHUB || "AadhilKassim",
  instagram: "",
  // Provided LinkedIn handle — Footer will link to https://www.linkedin.com/in/aadhilkassim
  linkedIn: process.env.REACT_APP_LINKEDIN || "aadhilkassim",
  medium: "",
  twitter: "",
  youTube: "",
};

const primaryColor = "#4E567E";
const secondaryColor = "#D2F1E4";

const App = () => {
  const [githubProfile, setGithubProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      const username = siteProps.gitHub;
      if (!username) return;
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("GitHub profile fetch failed");
        const data = await res.json();
        if (mounted) setGithubProfile(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    fetchProfile();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div id="main">
      <Header />
      <Home
        name={siteProps.name}
        title={siteProps.title}
        avatar={githubProfile?.avatar_url}
        bio={githubProfile?.bio}
      />
      <About avatar={githubProfile?.avatar_url} bio={githubProfile?.bio} />
      {/* pass GitHub username so Portfolio can fetch your repos */}
      <Portfolio gitHub={siteProps.gitHub} />
      <Footer {...siteProps} primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </div>
  );
};

export default App;
