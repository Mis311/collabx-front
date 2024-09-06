import React, { useState, useEffect } from "react";
import {
  FiHeart,
  FiRepeat,
  FiMaximize2,
  FiX,
  FiCopy,
  FiUserPlus,
} from "react-icons/fi";

const HomePage: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [activeTab, setActiveTab] = useState<"new" | "popular">("new");
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const handleExpand = (videoUrl: string) => {
    setExpandedVideo(videoUrl);
  };

  const toggleContactPopup = () => {
    setShowContactPopup(!showContactPopup);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://collabx.com/join");
    alert("Link copied to clipboard!");
  };
  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white min-h-screen relative overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Header/NavBar */}
      <header className="relative z-10 flex justify-between items-center p-4 mr-4 bg-gradient-to-r from-blue-900 to-purple-800">
        <div className="text-2xl font-bold">CollabX</div>
        <nav className="space-x-4">
          <a
            href="./"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/display"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Collaborate
          </a>
          <a
            href="./episode"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Read
          </a>
          <a
            href="./inspiration"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            AI
          </a>
        </nav>

        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
          Login
        </button>
      </header>

      {/* Main Section */}
      <main className="relative z-10 p-16 space-y-8">
        {/* New/Popular Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4 text-2xl">
            <button
              className={`font-bold ${
                activeTab === "new" ? "text-blue-300" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("new")}
            >
              New
            </button>
            <button
              className={`font-bold ${
                activeTab === "popular" ? "text-blue-300" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Popular
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Project Title"
              className="bg-transparent border-b border-blue-300 focus:outline-none text-blue-100 placeholder-blue-300"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <a href="./create">
              <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
                Create Project
              </button>
            </a>
          </div>
        </div>

        {/* Sub-Navigation (All, Video, etc.) */}
        <div className="space-x-12 mb-12 text-lg font-normal ">
          {["All", "Video", "Manga/Webtoon", "Visual Novel/Text"].map(
            (item) => (
              <button
                key={item}
                className="hover:text-blue-300 hover:underline transition-colors duration-300 hover:font-semibold"
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-2 gap-6 ">
          {activeTab === "new" ? (
            <>
              <a href={`/display`}>
                <ProjectCard
                  title="Slice of Life in Kabuki-cho"
                  author="Local Toyota"
                  image="/placeholder.svg?height=300&width=500"
                  isNew={true}
                  views={234}
                  likes={45}
                  onExpand={handleExpand}
                />
              </a>
              <ProjectCard
                title="Slice of Life in Kabuki-cho (Comics)"
                author="Local Toyota"
                image="/placeholder.svg?height=300&width=500"
                isNew={false}
                views={234}
                likes={45}
                onExpand={handleExpand}
              />
            </>
          ) : (
            <>
              <a href={`/display`}>
                <ProjectCard
                  title="Popular Anime Project"
                  author="Famous Studio"
                  image="/placeholder.svg?height=300&width=500"
                  isNew={false}
                  views={500}
                  likes={120}
                  onExpand={handleExpand}
                />
              </a>
              <ProjectCard
                title="Popular Manga Project"
                author="Famous Studio"
                image="/placeholder.svg?height=300&width=500"
                isNew={false}
                views={600}
                likes={150}
                onExpand={handleExpand}
              />
            </>
          )}
        </div>
        <footer className="relative z-10 py-4 text-center">
          <button
            onClick={toggleContactPopup}
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Contact
          </button>
        </footer>
        {/* Expanded Video Modal */}
        {expandedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-gradient-to-br from-blue-900 to-purple-800 p-4 rounded-lg">
              <video
                src={expandedVideo}
                className="w-full h-auto"
                controls
                autoPlay
              />
              <button
                className="absolute top-2 right-2 text-white hover:text-blue-300 transition-colors duration-300"
                onClick={() => setExpandedVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-blue-900 to-purple-800 p-8 rounded-lg max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors duration-300"
              onClick={toggleContactPopup}
            >
              <FiX size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4">Join Collab X Team</h2>
            <p className="mb-4">
              Welcome to CollabX - a place where creativity meets collaboration!
              Here, people find exciting projects to collaborate on, companies
              discover great stories to bring to life, and artists and marketers
              leverage their skills to scale their stories across different
              media and languages.
            </p>
            <p className="mb-4">
              But collaboration at CollabX isn't just for artists. We're also
              looking for talented developers, business minds, and sponsors to
              join our community and help bring these amazing stories to life.
            </p>
            <div className="flex space-x-4 mt-6">
              <button
                className="flex items-center bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300"
                onClick={() => {
                  /* Add join functionality */
                }}
              >
                <FiUserPlus className="mr-2" /> Join Now
              </button>
              <button
                className="flex items-center bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition-colors duration-300"
                onClick={copyLink}
              >
                <FiCopy className="mr-2" /> Copy Invite Link
              </button>
            </div>
          </div>
        </div>
      )}
      {/* CSS for animations */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  author: string;
  image: string;
  isNew: boolean;
  views: number;
  likes: number;
  onExpand: (videoUrl: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  image,
  isNew,
  views,
  likes,
  onExpand,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mt-4 bg-gradient-to-br from-blue-800 to-purple-700  rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {isHovered ? (
          <video
            src={image}
            className="w-full h-64 object-cover"
            autoPlay
            muted
            loop
          />
        ) : (
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-blue-500 px-2 py-1 rounded text-sm">
            New
          </span>
        )}
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm hover:bg-opacity-75 transition-colors duration-300"
          onClick={() => onExpand(image)}
        >
          <FiMaximize2 />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-blue-200 mb-2">{author}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-sm text-blue-200">
            <span>{views} views</span>
            <span>{likes} likes</span>
          </div>
          <div className="flex space-x-2">
            <FiRepeat className="text-blue-200 hover:text-white transition-colors duration-300" />
            <FiHeart className="text-blue-200 hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
