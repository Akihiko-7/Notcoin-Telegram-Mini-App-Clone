import { useEffect, useState } from 'react';
import './App.css';
import Arrow from './Icons/Arrow';
import { bear, coin, muscle, notcoin, rocket, trophy } from './images';

function App() {
  const [points, setPoints] = useState(29857775);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen flex flex-col items-center justify-center text-white font-medium relative overflow-hidden">
      {/* Background Overlays */}
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="w-full z-10 flex flex-col items-center text-white">
        {/* Join Goblins Section */}
        <div className="w-full max-w-xs mt-8 px-4 pt-8 z-10 flex items-center justify-center">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg">
                Join Goblins{' '}
                <Arrow size={18} className="ml-0 mb-1 inline-block" />
              </p>
            </div>
          </div>
        </div>

        {/* Points Display Section */}
        <div className="mt-16 text-5xl font-bold flex items-center z-10">
          <img src={coin} width={70} height={78} alt="Coin Icon" />
          <span className="ml-2">{points.toLocaleString()}</span>
        </div>
        <div className="text-base mt-2 flex items-center">
          <img src={trophy} width={24} height={24} alt="Trophy Icon" />
          <span className="ml-1">Scout <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
        <div className="w-full flex justify-between gap-2">
          <div className="w-1/3 flex items-center justify-start max-w-32">
            <div className="flex items-center justify-center">
              <img src={muscle} width={44} height={44} alt="High Voltage" />
            </div>
            <div className="ml-2 text-left">
              <span className="text-white text-2xl font-bold block">{energy}</span>
              <span className="text-white text-lg opacity-75">/ 6500</span>
            </div>
          </div>
        </div>

        <div className="flex-grow flex items-center max-w-lg text-sm">
          <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
            <button className="flex flex-col items-center gap-1">
              <img src={bear} width={40} height={40} alt="Bear" />
              <span>Kindlings</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <img src={coin} width={40} height={40} alt="Coin" />
              <span>Earn</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <img src={rocket} width={30} height={30} alt="Rocket" />
              <span>Boosts</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f9c035] rounded-full mt-4">
        <div
          className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
          style={{ width: `${(energy / 6500) * 100}%` }}></div>
      </div>

      {/* Centered Clickable Notcoin Logo */}
      <div className="flex-grow flex items-center justify-center">
        <div className="relative flex justify-center items-center" style={{ height: '256px' }} onClick={handleClick}>
          <img src={notcoin} width={256} height={256} alt="notcoin" />
          {clicks.map((click) => (
            <div
              key={click.id}
              className="absolute text-5xl font-bold animate-float"
              style={{
                top: `${click.y}px`, // Adjust to center vertically
                left: `${click.x}px`, // Adjust to center horizontally
                transform: 'translate(-50%, -50%)' // Fine-tune centering
              }}
              onAnimationEnd={() => handleAnimationEnd(click.id)}
            >
              12
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;


