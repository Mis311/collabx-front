import React, { useState } from 'react';
import { FiHeart, FiRepeat, FiPiggy } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold">CollabX</div>
        <nav className="space-x-4">
          <a href="#" className="underline">Home</a>
          <a href="#">Collaborate</a>
          <a href="#">Funding</a>
          <a href="#">Join CollabX Team</a>
        </nav>
        <button className="bg-gray-700 px-4 py-2 rounded">Login</button>
      </header>

      <main className="p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4 text-2xl">
            <span className="font-bold">New</span>
            <span className="text-gray-400">Popular</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Project Title"
              className="bg-transparent border-b border-gray-600 focus:outline-none"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <button className="bg-purple-600 px-4 py-2 rounded">Create Project</button>
          </div>
        </div>

        <div className="space-x-4 mb-8">
          <button className="underline">All</button>
          <button>Video</button>
          <button>Manga/Webtoon</button>
          <button>Visual Novel/Text</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProjectCard
            title="Slice of Life in Kabuki-cho"
            author="Local Toyota"
            image="/placeholder.svg?height=300&width=500"
            isNew={true}
            views={234}
            likes={45}
          />
          <ProjectCard
            title="Slice of Life in Kabuki-cho (Comics)"
            author="Local Toyota"
            image="/placeholder.svg?height=300&width=500"
            isNew={false}
            views={234}
            likes={45}
          />
        </div>
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, author, image, isNew, views, likes }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {isNew && (
          <span className="absolute top-2 left-2 bg-purple-600 px-2 py-1 rounded text-sm">New</span>
        )}
        <button className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
          Open for Collab X
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 mb-2">{author}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-sm text-gray-400">
            <span>{views}</span>
            <span>{likes}</span>
          </div>
          <div className="flex space-x-2">
            <FiRepeat className="text-gray-400" />
            <FiHeart className="text-gray-400" />
            <FiPiggy className="text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;