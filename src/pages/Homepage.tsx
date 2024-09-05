import React, { useState } from 'react';
import { FiHeart, FiRepeat, FiMaximize2 } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'new' | 'popular'>('new');
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const handleExpand = (videoUrl: string) => {
    setExpandedVideo(videoUrl);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header/NavBar */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <div className="text-2xl font-bold">CollabX</div>
        <nav className="space-x-4">
          {['Home', 'Collaborate', 'Funding', 'Join CollabX Team'].map((item) => (
            <a
              href="#"
              key={item}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300">
          Login
        </button>
      </header>

      {/* Main Section */}
      <main className="p-16 space-y-8">
        {/* New/Popular Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4 text-2xl">
            <button
              className={`font-bold ${activeTab === 'new' ? 'text-purple-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('new')}
            >
              New
            </button>
            <button
              className={`font-bold ${activeTab === 'popular' ? 'text-purple-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('popular')}
            >
              Popular
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Project Title"
              className="bg-transparent border-b border-gray-600 focus:outline-none"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <a href="./create"><button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500 transition-colors duration-300">
              Create Project
            </button></a>
          </div>
        </div>

        {/* Sub-Navigation (All, Video, etc.) */}
        <div className="space-x-4 mb-8 text-lg">
          {['All', 'Video', 'Manga/Webtoon', 'Visual Novel/Text'].map((item) => (
            <button
              key={item}
              className="hover:text-purple-400 underline hover:no-underline transition-colors duration-300"
              
            >
              {item}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-2 gap-6">
          {activeTab === 'new' ? (
            <>
            <a 
              href={`/display`} 
            
            >
              <ProjectCard
                title="Slice of Life in Kabuki-cho"
                author="Local Toyota"
                image="/placeholder.svg?height=300&width=500"
                isNew={true}
                views={234}
                likes={45}
                onExpand={handleExpand}
              
              /></a>
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
              {/* Add content for the 'Popular' tab here */}
              <a 
              href={`/display`} 
            
            >
              <ProjectCard
                title="Popular Anime Project"
                author="Famous Studio"
                image="/placeholder.svg?height=300&width=500"
                isNew={false}
                views={500}
                likes={120}
                onExpand={handleExpand}
              />
              <ProjectCard
                title="Popular Manga Project"
                author="Famous Studio"
                image="/placeholder.svg?height=300&width=500"
                isNew={false}
                views={600}
                likes={150}
                onExpand={handleExpand}
              />
              </a>
            </>
          )}
        </div>

        {/* Expanded Video Modal */}
        {expandedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-gray-900 p-4 rounded-lg">
              <video src={expandedVideo} className="w-full h-auto" controls autoPlay />
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setExpandedVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
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

const ProjectCard: React.FC<ProjectCardProps> = ({ title, author, image, isNew, views, likes, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {isHovered ? (
          <video src={image} className="w-full h-48 object-cover" autoPlay muted loop />
        ) : (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-purple-600 px-2 py-1 rounded text-sm">New</span>
        )}
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm"
          onClick={() => onExpand(image)}
        >
          <FiMaximize2 />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 mb-2">{author}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-sm text-gray-400">
            <span>{views} views</span>
            <span>{likes} likes</span>
          </div>
          <div className="flex space-x-2">
            <FiRepeat className="text-gray-400 hover:text-white transition-colors duration-300" />
            <FiHeart className="text-gray-400 hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
