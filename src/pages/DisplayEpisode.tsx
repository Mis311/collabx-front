import React, { useState, useEffect } from "react";

interface EpisodeContent {
  type: "text" | "image" | "video";
  content: string;
}

interface Episode {
  id: number;
  title: string;
  author: string;
  contents: EpisodeContent[];
}

const mockEpisode: Episode = {
  id: 1,
  title: "The Whispers of Eternity",
  author: "Aria Nightshade",
  contents: [
    {
      type: "text",
      content:
        "In the heart of the Whispering Woods, where shadows danced with moonlight, Lyra found herself standing before an ancient, gnarled tree. Its bark seemed to pulse with an otherworldly energy, beckoning her closer.",
    },
    { type: "image", content: "/placeholder.svg?height=400&width=600" },
    {
      type: "text",
      content:
        "She reached out, her fingers trembling as they brushed against the rough surface. Suddenly, a flood of whispers filled her mind, carrying the weight of centuries. Lyra gasped, overwhelmed by the secrets of the forest.",
    },
    {
      type: "text",
      content:
        "As the whispers subsided, Lyra noticed a faint glow emanating from a hollow in the tree. Curiosity overcame caution, and she reached inside, her hand closing around a small, warm object.",
    },
    { type: "image", content: "/placeholder.svg?height=400&width=600" },
    {
      type: "text",
      content:
        "Pulling it out, she found herself holding a crystal that pulsed with an inner light. The forest around her seemed to hold its breath, waiting. Lyra knew, in that moment, that her ordinary life had come to an end. A new journey, filled with magic and mystery, was about to begin.",
    },
    { type: "video", content: "https://example.com/video.mp4" },
    {
      type: "text",
      content:
        "As dawn broke, casting long shadows through the trees, Lyra set out from the Whispering Woods. The crystal hung around her neck, a constant reminder of the path that lay ahead. With each step, she felt the world changing around her, revealing secrets long hidden from mortal eyes.",
    },
    {
      type: "text",
      content:
        "Little did she know, far beyond the forest's edge, ancient powers were stirring. The balance of the world hung by a thread, and Lyra's discovery had set in motion events that would shape the fate of realms both seen and unseen.",
    },
  ],
};

const DisplayEpisode: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      const sections = document.querySelectorAll(".content-section");
      let newActiveSection = 0;
      sections.forEach((section, index) => {
        const rect = (section as HTMLElement).getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          newActiveSection = index;
        }
      });
      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 relative overflow-hidden">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-purple-200 z-50">
        <div
          className="h-full bg-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-purple-900 p-4 flex justify-between items-center z-40">
        <a href="./">
          <div className="text-2xl font-bold">CollabX</div>
        </a>
        <nav className="flex items-center space-x-4">
          <a
            href="./"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/display"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Collaborate
          </a>
          <a
            href="./episode"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Read
          </a>
          <a
            href="./inspiration"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            AI
          </a>
          <button className="bg-gradient-to-br from-purple-700 to-indigo-700 px-4 py-2 rounded hover:opacity-90 transition-opacity duration-300">
            Login
          </button>
        </nav>
      </header>

      <main className="pt-20 px-4 max-w-4xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-gray-800 to-purple-800 rounded-lg p-6 shadow-lg backdrop-blur-sm bg-opacity-80 mb-8">
          <h1 className="text-3xl font-bold text-purple-200 mb-2">
            {mockEpisode.title}
          </h1>
          <h2 className="text-xl text-indigo-200 mb-4">
            By {mockEpisode.author}
          </h2>
        </div>

        {mockEpisode.contents.map((content, index) => (
          <div
            key={index}
            className={`content-section mb-8 transition-all duration-500 ease-in-out ${
              index === activeSection
                ? "scale-105 opacity-100"
                : "scale-100 opacity-70"
            }`}
          >
            {content.type === "text" && (
              <p className="text-lg leading-relaxed">{content.content}</p>
            )}
            {content.type === "image" && (
              <img
                src={content.content}
                alt={`Scene from ${mockEpisode.title}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
            {content.type === "video" && (
              <video
                src={content.content}
                controls
                className="w-full h-auto rounded-lg shadow-lg"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </main>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayEpisode;
