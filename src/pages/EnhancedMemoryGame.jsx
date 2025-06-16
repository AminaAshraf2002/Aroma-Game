import React, { useState, useEffect } from 'react';
import './EnhancedMemoryGame.css';

// Import your perfume bottle images from assets folder
import roseBottleImg from '../assets/images/rose.png';
import vanillaBottleImg from '../assets/images/vannila.jpeg';
import lavenderBottleImg from '../assets/images/lavendor.jpeg';
import citrusBottleImg from '../assets/images/citrus.jpeg';
import woodBottleImg from '../assets/images/woo.jpeg';
import muskBottleImg from '../assets/images/mushk.jpeg';

// Alternative import paths - use one of these based on your folder structure:
// import roseBottleImg from './assets/rose.png';
// import roseBottleImg from '/src/assets/rose.png';
// import roseBottleImg from 'public/assets/rose.png';

const EnhancedMemoryGame = () => {
  const [cards] = useState([
    { 
      id: 1, 
      text: "Rose", 
      match: 2, 
      type: "name", 
      flipped: false, 
      matched: false,
      icon: "fas fa-rose",
      color: "enhanced-rose-gradient",
      bottleShape: "elegant",
      bottleName: "Rose Elegance",
      bottleImage: roseBottleImg
    },
    { 
      id: 2, 
      text: "Floral, Sweet, Romantic", 
      match: 1, 
      type: "description", 
      flipped: false, 
      matched: false,
      icon: "fas fa-rose",
      color: "enhanced-rose-gradient",
      bottleShape: "elegant",
      bottleName: "Rose Elegance",
      bottleImage: roseBottleImg
    },
    { 
      id: 3, 
      text: "Vanilla", 
      match: 4, 
      type: "name", 
      flipped: false, 
      matched: false,
      icon: "fas fa-ice-cream",
      color: "enhanced-vanilla-gradient",
      bottleShape: "round",
      bottleName: "Vanilla Dreams",
      bottleImage: vanillaBottleImg
    },
    { 
      id: 4, 
      text: "Sweet, Creamy, Warm", 
      match: 3, 
      type: "description", 
      flipped: false, 
      matched: false,
      icon: "fas fa-ice-cream",
      color: "enhanced-vanilla-gradient",
      bottleShape: "round",
      bottleName: "Vanilla Dreams",
      bottleImage: vanillaBottleImg
    },
    { 
      id: 5, 
      text: "Lavender", 
      match: 6, 
      type: "name", 
      flipped: false, 
      matched: false,
      icon: "fas fa-spa",
      color: "enhanced-lavender-gradient",
      bottleShape: "tall",
      bottleName: "Lavender Serenity",
      bottleImage: lavenderBottleImg
    },
    { 
      id: 6, 
      text: "Calming, Fresh, Herbal", 
      match: 5, 
      type: "description", 
      flipped: false, 
      matched: false,
      icon: "fas fa-spa",
      color: "enhanced-lavender-gradient",
      bottleShape: "tall",
      bottleName: "Lavender Serenity",
      bottleImage: lavenderBottleImg
    },
    { 
      id: 7, 
      text: "Bergamot", 
      match: 8, 
      type: "name", 
      flipped: false, 
      matched: false,
      icon: "fas fa-lemon",
      color: "enhanced-citrus-gradient",
      bottleShape: "square",
      bottleName: "Citrus Fresh",
      bottleImage: citrusBottleImg
    },
    { 
      id: 8, 
      text: "Citrus, Bright, Energizing", 
      match: 7, 
      type: "description", 
      flipped: false, 
      matched: false,
      icon: "fas fa-lemon",
      color: "enhanced-citrus-gradient",
      bottleShape: "square",
      bottleName: "Citrus Fresh",
      bottleImage: citrusBottleImg
    },
    { 
      id: 9, 
      text: "Sandalwood", 
      match: 10, 
      type: "name", 
      flipped: false, 
      matched: false,
      icon: "fas fa-tree",
      color: "enhanced-wood-gradient",
      bottleShape: "diamond",
      bottleName: "Mystic Wood",
      bottleImage: woodBottleImg
    },
    { 
      id: 10, 
      text: "Woody, Deep, Grounding", 
      match: 9, 
      type: "description", 
      flipped: false, 
      matched: false,
      icon: "fas fa-tree",
      color: "enhanced-wood-gradient",
      bottleShape: "diamond",
      bottleName: "Mystic Wood",
      bottleImage: woodBottleImg
    },
    { 
      id: 11, 
      text: "Musk", 
      match: 12, 
      type: "name", 
      flipped: false, 
      matched: false,
      icon: "fas fa-magic",
      color: "enhanced-musk-gradient",
      bottleShape: "crystal",
      bottleName: "Midnight Allure",
      bottleImage: muskBottleImg
    },
    { 
      id: 12, 
      text: "Sensual, Rich, Lasting", 
      match: 11, 
      type: "description", 
      flipped: false, 
      matched: false,
      icon: "fas fa-magic",
      color: "enhanced-musk-gradient",
      bottleShape: "crystal",
      bottleName: "Midnight Allure",
      bottleImage: muskBottleImg
    }
  ]);

  const [gameCards, setGameCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Load Font Awesome
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Initialize game
  useEffect(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
  }, [cards]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameWon) {
        setTimer(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameWon]);

  // Handle image load errors
  const handleImageError = (bottleImage) => {
    console.log('Image failed to load:', bottleImage);
    setImageErrors(prev => ({
      ...prev,
      [bottleImage]: true
    }));
  };

  const handleImageLoad = (bottleImage) => {
    console.log('Image loaded successfully:', bottleImage);
    setImageErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[bottleImage];
      return newErrors;
    });
  };

  // Perfume Bottle Component with Full Cover Image Support and SVG Fallback
  const PerfumeBottleDisplay = ({ bottleImage, bottleName, matched, bottleShape, color }) => {
    const hasImageError = imageErrors[bottleImage];
    
    return (
      <div className="enhanced-bottle-container">
        <div className={`enhanced-bottle-wrapper ${matched ? 'enhanced-bottle-matched' : ''}`}>
          {!hasImageError ? (
            <div className="enhanced-full-cover-image">
              <img 
                src={bottleImage} 
                alt={bottleName}
                className={`enhanced-perfume-bottle-image ${matched ? 'enhanced-matched-bottle' : ''} enhanced-bottle-${bottleShape}`}
                onError={() => handleImageError(bottleImage)}
                onLoad={() => handleImageLoad(bottleImage)}
              />
              {/* Dark overlay for better text readability */}
              <div className="enhanced-image-overlay"></div>
            </div>
          ) : (
            // SVG Fallback when image fails to load
            <div className="enhanced-svg-fallback-container">
              <svg
                viewBox="0 0 80 100"
                className={`enhanced-perfume-bottle-svg ${matched ? 'enhanced-matched-bottle' : ''} enhanced-bottle-${bottleShape}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`fallback-gradient-${bottleShape}-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.7)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
                  </linearGradient>
                  <linearGradient id={`fallback-cap-gradient-${bottleShape}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                
                {/* Different bottle shapes based on bottleShape prop */}
                {bottleShape === 'elegant' && (
                  <path
                    d="M20 30 C20 25, 25 20, 30 20 L50 20 C55 20, 60 25, 60 30 L60 80 C60 85, 55 90, 50 90 L30 90 C25 90, 20 85, 20 80 Z"
                    fill={`url(#fallback-gradient-${bottleShape}-${color})`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1"
                  />
                )}
                
                {bottleShape === 'round' && (
                  <circle
                    cx="40"
                    cy="50"
                    r="25"
                    fill={`url(#fallback-gradient-${bottleShape}-${color})`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1"
                  />
                )}
                
                {bottleShape === 'square' && (
                  <rect
                    x="25"
                    y="25"
                    width="30"
                    height="50"
                    rx="3"
                    fill={`url(#fallback-gradient-${bottleShape}-${color})`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1"
                  />
                )}
                
                {(bottleShape === 'tall' || bottleShape === 'diamond' || bottleShape === 'crystal') && (
                  <path
                    d="M25 30 C25 25, 30 20, 35 20 L45 20 C50 20, 55 25, 55 30 L55 80 C55 85, 50 90, 45 90 L35 90 C30 90, 25 85, 25 80 Z"
                    fill={`url(#fallback-gradient-${bottleShape}-${color})`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1"
                  />
                )}
                
                {/* Bottle Neck - for all shapes */}
                <rect
                  x="35"
                  y="10"
                  width="10"
                  height="10"
                  fill={`url(#fallback-gradient-${bottleShape}-${color})`}
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="1"
                  rx="1"
                />
                
                {/* Bottle Cap - for all shapes */}
                <ellipse
                  cx="40"
                  cy="8"
                  rx="8"
                  ry="5"
                  fill={`url(#fallback-cap-gradient-${bottleShape})`}
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="1"
                />
                
                {/* Decorative elements based on perfume type */}
                <text x="40" y="55" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="Arial">
                  {color === 'enhanced-rose-gradient' && '🌹'}
                  {color === 'enhanced-vanilla-gradient' && '🍦'}
                  {color === 'enhanced-lavender-gradient' && '🌿'}
                  {color === 'enhanced-citrus-gradient' && '🍋'}
                  {color === 'enhanced-wood-gradient' && '🌳'}
                  {color === 'enhanced-musk-gradient' && '✨'}
                </text>
              </svg>
              <div className="enhanced-fallback-text">
                Image not found
              </div>
            </div>
          )}
        </div>
        
        {matched && (
          <div className="enhanced-bottle-sparkles">
            <i className="fas fa-sparkles enhanced-sparkle-1"></i>
            <i className="fas fa-star enhanced-sparkle-2"></i>
            <i className="fas fa-sparkles enhanced-sparkle-3"></i>
            <i className="fas fa-magic enhanced-sparkle-4"></i>
          </div>
        )}
        
        <div className="enhanced-bottle-label">{bottleName}</div>
        
        {matched && (
          <div className="enhanced-match-celebration-text">
            <i className="fas fa-heart"></i>
            Perfect Match!
          </div>
        )}
      </div>
    );
  };

  const handleCardClick = (clickedCard) => {
    if (clickedCard.flipped || clickedCard.matched || selectedCards.length === 2) {
      return;
    }

    const newCards = gameCards.map(card => 
      card.id === clickedCard.id ? { ...card, flipped: true } : card
    );
    setGameCards(newCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      
      // Check for match
      if (newSelected[0].match === newSelected[1].id) {
        // Match found!
        setTimeout(() => {
          const matchedCards = gameCards.map(card => 
            (card.id === newSelected[0].id || card.id === newSelected[1].id) 
              ? { ...card, matched: true, flipped: true } 
              : card
          );
          setGameCards(matchedCards);
          setSelectedCards([]);
          setScore(score + 100);
          setMatchedPairs(matchedPairs + 1);

          // Check if game is won
          if (matchedCards.filter(card => card.matched).length === 12) {
            setTimeout(() => setGameWon(true), 500);
          }
        }, 1000);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          const flippedBack = gameCards.map(card => 
            (card.id === newSelected[0].id || card.id === newSelected[1].id) 
              ? { ...card, flipped: false } 
              : card
          );
          setGameCards(flippedBack);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setSelectedCards([]);
    setScore(0);
    setMoves(0);
    setGameWon(false);
    setTimer(0);
    setMatchedPairs(0);
    setImageErrors({});
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="enhanced-perfume-memory-game">
      {/* Floating Background Elements */}
      <div className="enhanced-floating-bg enhanced-floating-bg-1"></div>
      <div className="enhanced-floating-bg enhanced-floating-bg-2"></div>
      <div className="enhanced-floating-bg enhanced-floating-bg-3"></div>
      
      <div className="enhanced-game-container">
        {/* Header */}
        <div className="enhanced-game-header">
          <h1 className="enhanced-game-title">
            <i className="fas fa-gem"></i>
            Perfume Memory Palace
            <i className="fas fa-gem"></i>
          </h1>
          <p className="enhanced-game-subtitle">
            <i className="fas fa-magic"></i>
            Match perfume names with their aromatic descriptions
          </p>
          <div className="enhanced-title-divider"></div>
        </div>

        {/* Game Stats */}
        <div className="enhanced-stats-container">
          <div className="enhanced-stat-card">
            <i className="fas fa-trophy enhanced-stat-icon"></i>
            <div className="enhanced-stat-label">Score</div>
            <div className="enhanced-stat-value">{score}</div>
          </div>
          <div className="enhanced-stat-card">
            <i className="fas fa-bullseye enhanced-stat-icon"></i>
            <div className="enhanced-stat-label">Moves</div>
            <div className="enhanced-stat-value">{moves}</div>
          </div>
          <div className="enhanced-stat-card">
            <i className="fas fa-clock enhanced-stat-icon"></i>
            <div className="enhanced-stat-label">Time</div>
            <div className="enhanced-stat-value">{formatTime(timer)}</div>
          </div>
          <div className="enhanced-stat-card">
            <i className="fas fa-heart enhanced-stat-icon"></i>
            <div className="enhanced-stat-label">Pairs</div>
            <div className="enhanced-stat-value">{matchedPairs}/6</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="enhanced-game-board">
          {gameCards.map((card) => (
            <div
              key={card.id}
              data-card-id={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                enhanced-memory-card 
                ${card.flipped || card.matched ? `enhanced-flipped ${card.color}` : ''}
                ${card.matched ? 'enhanced-matched' : ''}
              `}
            >
              <div className="enhanced-card-inner">
                {card.flipped || card.matched ? (
                  <div className="enhanced-card-front">
                    {card.matched ? (
                      // Show perfume bottle image when matched
                      <div className="enhanced-matched-card-content">
                        <PerfumeBottleDisplay 
                          bottleImage={card.bottleImage}
                          bottleName={card.bottleName}
                          matched={card.matched}
                          bottleShape={card.bottleShape}
                          color={card.color}
                        />
                      </div>
                    ) : (
                      // Show original content when flipped but not matched
                      <>
                        {card.type === 'name' ? (
                          <>
                            <i className={`${card.icon} enhanced-perfume-icon`}></i>
                            <div className="enhanced-card-title">{card.text}</div>
                            <div className="enhanced-card-type">
                              <i className="fas fa-leaf"></i>
                              Perfume Name
                            </div>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-quote-left enhanced-perfume-icon"></i>
                            <div className="enhanced-card-title">{card.text}</div>
                            <div className="enhanced-card-type">
                              <i className="fas fa-scroll"></i>
                              Description
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="enhanced-card-back">
                    <i className="fas fa-mask enhanced-card-back-icon"></i>
                    <div className="enhanced-card-back-text">Click to reveal</div>
                    <div className="enhanced-card-shimmer"></div>
                  </div>
                )}
              </div>
              
              {/* Enhanced sparkle effects for matched cards */}
              {card.matched && (
                <div className="enhanced-card-sparkles">
                  <i className="fas fa-sparkles enhanced-card-sparkle-1"></i>
                  <i className="fas fa-star enhanced-card-sparkle-2"></i>
                  <i className="fas fa-sparkles enhanced-card-sparkle-3"></i>
                  <i className="fas fa-star enhanced-card-sparkle-4"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Game Won Modal */}
        {gameWon && (
          <div className="enhanced-victory-modal">
            <div className="enhanced-victory-content">
              <div className="enhanced-victory-icon">
                <i className="fas fa-crown"></i>
              </div>
              <h2 className="enhanced-victory-title">Magnificent!</h2>
              <p className="enhanced-victory-subtitle">You've mastered the art of perfume memory matching!</p>
              
              <div className="enhanced-victory-stats">
                <div className="enhanced-victory-stat">
                  <i className="fas fa-trophy"></i>
                  <div className="enhanced-victory-stat-value">{score}</div>
                  <div className="enhanced-victory-stat-label">Score</div>
                </div>
                <div className="enhanced-victory-stat">
                  <i className="fas fa-bullseye"></i>
                  <div className="enhanced-victory-stat-value">{moves}</div>
                  <div className="enhanced-victory-stat-label">Moves</div>
                </div>
                <div className="enhanced-victory-stat">
                  <i className="fas fa-clock"></i>
                  <div className="enhanced-victory-stat-value">{formatTime(timer)}</div>
                  <div className="enhanced-victory-stat-label">Time</div>
                </div>
                <div className="enhanced-victory-stat">
                  <i className="fas fa-heart"></i>
                  <div className="enhanced-victory-stat-value">6/6</div>
                  <div className="enhanced-victory-stat-label">Pairs</div>
                </div>
              </div>
              
              <button onClick={resetGame} className="enhanced-victory-button">
                <i className="fas fa-play"></i>
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="enhanced-control-buttons">
          <button onClick={resetGame} className="enhanced-control-button">
            <i className="fas fa-redo"></i>
            New Game
          </button>
        </div>

        {/* Instructions */}
        <div className="enhanced-instructions">
          <h3 className="enhanced-instructions-title">
            <i className="fas fa-gamepad"></i>
            How to Play:
          </h3>
          <ul className="enhanced-instructions-list">
            <li>
              <i className="fas fa-mouse-pointer"></i>
              Click cards to flip them over and reveal the content
            </li>
            <li>
              <i className="fas fa-search"></i>
              Match perfume names with their corresponding descriptions
            </li>
            <li>
              <i className="fas fa-palette"></i>
              Each pair has matching colors - Rose, Vanilla, Lavender, etc.
            </li>
            <li>
              <i className="fas fa-image"></i>
              When matched, both cards transform into beautiful perfume bottle images!
            </li>
            <li>
              <i className="fas fa-puzzle-piece"></i>
              Complete all 6 pairs to win the game!
            </li>
            <li>
              <i className="fas fa-medal"></i>
              Try to get the highest score in the least moves!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMemoryGame;