import React, { useState } from 'react'

type ContributorRole = 'Cartoonist' | 'AI generator' | 'Marketer'

interface Episode {
  id: number
  title: string
  isNew?: boolean
}

interface ContributionModalProps {
  isOpen: boolean
  onClose: () => void
  role: ContributorRole
  reward: string
}

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContributionModal: React.FC<ContributionModalProps> = ({ isOpen, onClose, role, reward }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Contribute as {role}</h2>
        <p className="mb-4 text-gray-300">Reward: {reward}</p>
        <form onSubmit={(e) => { e.preventDefault(); console.log('Submission for', role); onClose(); }}>
          <input type="file" className="mb-4 text-white" />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white">Close</button>
      </div>
    </div>
  )
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Make a Donation</h2>
        <form onSubmit={(e) => { e.preventDefault(); console.log('Donation submitted'); onClose(); }}>
          <input type="number" placeholder="Amount" className="mb-4 p-2 w-full rounded" />
          <select className="mb-4 p-2 w-full rounded">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Crypto</option>
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Finalize Donation
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white">Close</button>
      </div>
    </div>
  )
}

export default function LostCityPage() {
  const [selectedRole, setSelectedRole] = useState<ContributorRole | null>(null)
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)

  const episodes: Episode[] = [
    { id: 1, title: 'Episode 1' },
    { id: 2, title: 'Episode 2' },
    { id: 3, title: 'Episode 3', isNew: true },
  ]

  const handleWatchNow = () => {
    console.log('Navigating to watch page')
    // Implement your navigation logic here
  }

  const handleEpisodeClick = (episodeId: number) => {
    console.log(`Navigating to episode ${episodeId}`)
    // Implement your navigation logic here
  }

  const handleContributorClick = (role: ContributorRole) => {
    setSelectedRole(role)
    setIsContributionModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
     <header className="flex justify-between items-center p-4 bg-gray-800">
       <a href='./'> <div className="text-2xl font-bold">CollabX</div></a>
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

      <main className="mx-auto p-16 overflow-hidden">
        <div className="mb-8 relative ">
          <img
            src="/placeholder.svg?height=256&width=1024"
            alt="Lost City"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-4xl font-bold mb-2">LOST CITY</h1>
            <p className="mb-4">Initiating Your Journey..</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWatchNow}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
              >
                Watch Now
              </button>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="text-2xl hover:text-purple-400"
              >
                🤍
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-sm">
            image powered by Galadriel
          </div>
        </div>

        <div className="mb-8">
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
            Apply for Collab X
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Comics</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Visual Novel</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Animation</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Music</button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() => handleEpisodeClick(episode.id)}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 relative"
            >
              {episode.title}
              {episode.isNew && (
                <span className="absolute top-0 right-0 bg-purple-600 text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => handleContributorClick('Cartoonist')}
              className={`p-2 rounded ${selectedRole === 'Cartoonist' ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-700`}
            >
              Cartoonist
            </button>
            <button
              onClick={() => handleContributorClick('AI generator')}
              className={`p-2 rounded ${selectedRole === 'AI generator' ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-700`}
            >
              AI generator
            </button>
            <button
              onClick={() => handleContributorClick('Marketer')}
              className={`p-2 rounded ${selectedRole === 'Marketer' ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-700`}
            >
              Marketer
            </button>
          </div>
          <div className="text-sm mb-2">
            Mission: Cartoonist role is something something something
          </div>
          <div className="text-sm mb-4">
            Reward: NFT / Ownership / Name Credit
          </div>
          <button
            onClick={() => setIsContributionModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Contribute
          </button>
        </div>
      </main>

      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        role={selectedRole || 'Cartoonist'}
        reward="NFT / Ownership / Name Credit"
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  )
}