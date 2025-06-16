import React, { useState, useEffect } from 'react';
import './PerfumeFillingGame.css';

const PerfumeFillingGame = () => {
  const [perfumes] = useState([
    {
      id: 1,
      name: "Chanel No. 5",
      description: "Classic, elegant, feminine fragrance",
      blanks: ["Top Note", "Heart Note", "Base Note"],
      correctAnswers: ["Bergamot", "Jasmine", "Sandalwood"],
      hints: ["Citrus freshness", "Floral elegance", "Woody depth"]
    },
    {
      id: 2,
      name: "Dior Sauvage",
      description: "Fresh, spicy, masculine fragrance",
      blanks: ["Top Note", "Heart Note", "Base Note"],
      correctAnswers: ["Bergamot", "Pepper", "Ambroxan"],
      hints: ["Citrus opening", "Spicy heart", "Woody base"]
    },
    {
      id: 3,
      name: "Tom Ford Black Orchid",
      description: "Dark, mysterious, luxurious fragrance",
      blanks: ["Top Note", "Heart Note", "Base Note"],
      correctAnswers: ["Truffle", "Black Orchid", "Patchouli"],
      hints: ["Earthy opening", "Floral mystery", "Deep base"]
    }
  ]);

  const [ingredients] = useState([
    "Bergamot", "Jasmine", "Sandalwood", "Rose", "Vanilla", "Lavender",
    "Pepper", "Ambroxan", "Truffle", "Black Orchid", "Patchouli", "Musk",
    "Lemon", "Ylang-Ylang", "Cedar", "Amber", "Iris", "Vetiver"
  ]);

  const [currentPerfume, setCurrentPerfume] = useState(0);
  const [userAnswers, setUserAnswers] = useState(["", "", ""]);
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [draggedIngredient, setDraggedIngredient] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const currentPerfumeData = perfumes[currentPerfume];

  // Load Font Awesome CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    return () => {
      // Cleanup function to remove the link when component unmounts
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleDragStart = (e, ingredient) => {
    setDraggedIngredient(ingredient);
    e.dataTransfer.setData("text/plain", ingredient);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, blankIndex) => {
    e.preventDefault();
    const ingredient = e.dataTransfer.getData("text/plain");
    
    const newAnswers = [...userAnswers];
    newAnswers[blankIndex] = ingredient;
    setUserAnswers(newAnswers);
    setDraggedIngredient(null);
  };

  const handleTouchStart = (ingredient) => {
    setDraggedIngredient(ingredient);
  };

  const handleBlankClick = (blankIndex) => {
    if (draggedIngredient) {
      const newAnswers = [...userAnswers];
      newAnswers[blankIndex] = draggedIngredient;
      setUserAnswers(newAnswers);
      setDraggedIngredient(null);
    }
  };

  const checkAnswers = () => {
    const correct = userAnswers.filter((answer, index) => 
      answer === currentPerfumeData.correctAnswers[index]
    ).length;

    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);

    if (correct === 3) {
      // All correct - award points and advance
      const basePoints = 150;
      const bonusPoints = newAttemptCount === 1 ? 50 : 0; // First attempt bonus
      const totalPoints = basePoints + bonusPoints;
      
      setScore(prevScore => prevScore + totalPoints);
      
      if (bonusPoints > 0) {
        setFeedback(`🎉 Perfect on first try! +${totalPoints} points (${basePoints} + ${bonusPoints} bonus)`);
      } else {
        setFeedback(`🎉 Perfect! You got all ingredients correct! +${totalPoints} points`);
      }
      
      setTimeout(() => {
        if (currentPerfume < perfumes.length - 1) {
          nextPerfume();
        } else {
          setGameCompleted(true);
        }
      }, 2000);
    } else {
      // Some incorrect - stay on current perfume
      const points = newAttemptCount === 1 ? correct * 50 : 0; // Only award points on first attempt
      if (points > 0) {
        setScore(prevScore => prevScore + points);
      }

      // Show which answers are wrong
      const incorrectAnswers = userAnswers.map((answer, index) => {
        if (answer !== currentPerfumeData.correctAnswers[index]) {
          return {
            position: currentPerfumeData.blanks[index],
            userAnswer: answer,
            correctAnswer: currentPerfumeData.correctAnswers[index]
          };
        }
        return null;
      }).filter(item => item !== null);

      let feedbackText = `${correct}/3 correct. `;
      if (points > 0) {
        feedbackText += `+${points} points. `;
      }
      
      if (incorrectAnswers.length > 0) {
        feedbackText += "Incorrect: ";
        incorrectAnswers.forEach((item, index) => {
          feedbackText += `${item.position} should be ${item.correctAnswer}`;
          if (index < incorrectAnswers.length - 1) feedbackText += ", ";
        });
      }
      feedbackText += " Try again!";
      
      setFeedback(feedbackText);
      
      // Clear only incorrect answers after showing feedback for 3 seconds
      setTimeout(() => {
        const newAnswers = [...userAnswers];
        userAnswers.forEach((answer, index) => {
          if (answer !== currentPerfumeData.correctAnswers[index]) {
            newAnswers[index] = "";
          }
        });
        setUserAnswers(newAnswers);
      }, 3000);
    }
  };

  const nextPerfume = () => {
    setCurrentPerfume(currentPerfume + 1);
    setUserAnswers(["", "", ""]);
    setFeedback("");
    setShowHints(false);
    setAttemptCount(0);
  };

  const resetGame = () => {
    setCurrentPerfume(0);
    setUserAnswers(["", "", ""]);
    setScore(0);
    setFeedback("");
    setShowHints(false);
    setGameCompleted(false);
    setDraggedIngredient(null);
    setAttemptCount(0);
  };

  const clearAnswers = () => {
    setUserAnswers(["", "", ""]);
    setFeedback("");
  };

  return (
    <div className="perfume-game">
      {/* Enhanced Background with Blur Effect */}
      <div className="background-container">
        <div className="floating-bg-1"></div>
        <div className="floating-bg-2"></div>
        <div className="floating-bg-3"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-element elem1"></div>
      <div className="floating-element elem2"></div>
      <div className="floating-element elem3"></div>
      
      <div className="game-container">
        {/* Enhanced Header */}
        <div className="game-header">
          <h1 className="game-title">
            <i className="fas fa-flask icon-margin-right"></i>
            AROMA Creation Lab
            <i className="fas fa-flask icon-margin-left"></i>
          </h1>
          <p className="game-subtitle">
            <i className="fas fa-magic icon-margin-right"></i>
            Master the art of fragrance creation
          </p>
          <div className="title-divider"></div>
        </div>

        {/* Enhanced Game Stats */}
        <div className="game-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-label">Score</div>
            <div className="stat-value">{score}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-vial"></i>
            </div>
            <div className="stat-label">Perfume</div>
            <div className="stat-value">{currentPerfume + 1}/{perfumes.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <div className="stat-label">Attempts</div>
            <div className="stat-value">{attemptCount}</div>
          </div>
        </div>

        {!gameCompleted ? (
          <div className="game-content">
            {/* Enhanced Perfume Recipe Area */}
            <div className="recipe-panel">
              <div className="perfume-header">
                <h2 className="perfume-name">
                  <i className="fas fa-gem icon-margin-right"></i>
                  {currentPerfumeData.name}
                </h2>
                <p className="perfume-description">
                  <i className="fas fa-quote-left icon-margin-right"></i>
                  {currentPerfumeData.description}
                  <i className="fas fa-quote-right icon-margin-left"></i>
                </p>
                <div className="perfume-divider"></div>
              </div>

              {/* Enhanced Perfume Bottle Visualization */}
              <div className="bottle-container">
                <div className="bottle-wrapper">
                  <div className="perfume-bottle">
                    
                    {/* Enhanced Liquid Fill - Bottom Third (Base Note) */}
                    {userAnswers[2] && (
                      <div className="liquid-layer base-note">
                        <div className="liquid-shimmer"></div>
                        <div className="liquid-label">
                          <i className="fas fa-tree icon-margin-right-small"></i>
                          Base
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced Liquid Fill - Middle Third (Heart Note) */}
                    {userAnswers[1] && userAnswers[2] && (
                      <div className="liquid-layer heart-note">
                        <div className="liquid-shimmer"></div>
                        <div className="liquid-label">
                          <i className="fas fa-heart icon-margin-right-small"></i>
                          Heart
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced Liquid Fill - Top Third (Top Note) */}
                    {userAnswers[0] && userAnswers[1] && userAnswers[2] && (
                      <div className="liquid-layer top-note">
                        <div className="liquid-shimmer"></div>
                        <div className="liquid-label">
                          <i className="fas fa-cloud icon-margin-right-small"></i>
                          Top
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced Bottle Cap */}
                    <div className="bottle-cap">
                      <i className="fas fa-crown"></i>
                    </div>
                    
                    {/* Enhanced Sparkle Effect when complete */}
                    {userAnswers[0] && userAnswers[1] && userAnswers[2] && (
                      <div className="sparkles">
                        <div className="sparkle sparkle-1">
                          <i className="fas fa-sparkles"></i>
                        </div>
                        <div className="sparkle sparkle-2">
                          <i className="fas fa-star"></i>
                        </div>
                        <div className="sparkle sparkle-3">
                          <i className="fas fa-sparkles"></i>
                        </div>
                        <div className="sparkle sparkle-4">
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bottle-label">
                    <i className="fas fa-tag icon-margin-right"></i>
                    {currentPerfumeData.name}
                  </div>
                  
                  <div className="progress-indicators">
                    <div className={`progress-dot ${userAnswers[2] ? 'filled' : ''}`}>
                      <i className="fas fa-tree"></i>
                    </div>
                    <div className={`progress-dot ${userAnswers[1] ? 'filled' : ''}`}>
                      <i className="fas fa-heart"></i>
                    </div>
                    <div className={`progress-dot ${userAnswers[0] ? 'filled' : ''}`}>
                      <i className="fas fa-cloud"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Recipe Blanks */}
              <div className="recipe-blanks">
                {currentPerfumeData.blanks.map((blank, index) => (
                  <div key={index} className="blank-container">
                    <div className="blank-label">
                      <i className={`fas ${index === 0 ? 'fa-cloud' : index === 1 ? 'fa-heart' : 'fa-tree'} icon-margin-right`}></i>
                      {blank}:
                    </div>
                    <div
                      className={`
                        drop-zone
                        ${userAnswers[index] ? 'filled' : ''}
                        ${draggedIngredient ? 'highlight' : ''}
                      `}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onClick={() => handleBlankClick(index)}
                    >
                      {userAnswers[index] ? (
                        <div className="ingredient-display">
                          <i className="fas fa-leaf icon-margin-right"></i>
                          {userAnswers[index]}
                        </div>
                      ) : (
                        <div className="drop-placeholder">
                          <div className="drop-arrow">
                           
                          </div>
                          <div className="drop-text">
                            <i className="fas fa-plus icon-margin-right"></i>
                            Drop ingredient here
                          </div>
                          {showHints && (
                            <div className="hint-text">
                              <i className="fas fa-lightbulb icon-margin-right"></i>
                              {currentPerfumeData.hints[index]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="action-buttons">
                <button
                  onClick={checkAnswers}
                  disabled={userAnswers.some(answer => !answer)}
                  className={`btn btn-primary ${userAnswers.some(answer => !answer) ? 'disabled' : ''}`}
                >
                  <i className="fas fa-check-circle icon-margin-right"></i>
                  Check Recipe
                </button>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="btn btn-warning"
                >
                  <i className={`fas ${showHints ? 'fa-eye-slash' : 'fa-lightbulb'} icon-margin-right`}></i>
                  {showHints ? 'Hide' : 'Show'} Hints
                </button>
                <button
                  onClick={clearAnswers}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash-alt icon-margin-right"></i>
                  Clear
                </button>
              </div>

              {/* Enhanced Feedback */}
              {feedback && (
                <div className="feedback-message">
                  <i className="fas fa-trophy icon-margin-right"></i>
                  {feedback}
                </div>
              )}
            </div>

            {/* Enhanced Ingredients Panel */}
            <div className="ingredients-panel">
              <h3 className="ingredients-title">
                <i className="fas fa-seedling icon-margin-right"></i>
                Available Ingredients
              </h3>
              <div className="ingredients-grid">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, ingredient)}
                    onTouchStart={() => handleTouchStart(ingredient)}
                    className={`
                      ingredient-card
                      ${draggedIngredient === ingredient ? 'dragging' : ''}
                      ${userAnswers.includes(ingredient) ? 'used' : ''}
                    `}
                  >
                    <div className="ingredient-icon">
                      <i className="fas fa-leaf"></i>
                    </div>
                    <div className="ingredient-name">{ingredient}</div>
                    {userAnswers.includes(ingredient) && (
                      <div className="used-indicator">
                        <i className="fas fa-check icon-margin-right-small"></i>
                        Used
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="instructions">
                <h4 className="instructions-title">
                  <i className="fas fa-gamepad icon-margin-right"></i>
                  How to Play:
                </h4>
                <ul className="instructions-list">
                  <li>
                    <i className="fas fa-mouse icon-margin-right"></i>
                    Drag ingredients from this panel to recipe blanks
                  </li>
                  <li>
                    <i className="fas fa-mobile-alt icon-margin-right"></i>
                    On mobile: Tap ingredient, then tap blank space
                  </li>
                  <li>
                    <i className="fas fa-question-circle icon-margin-right"></i>
                    Use hints if you need help with ingredients
                  </li>
                  <li>
                    <i className="fas fa-fill-drip icon-margin-right"></i>
                    Watch the bottle fill as you add ingredients!
                  </li>
                  <li>
                    <i className="fas fa-bullseye icon-margin-right"></i>
                    Get all 3 correct to move to next perfume!
                  </li>
                  <li>
                    <i className="fas fa-star icon-margin-right"></i>
                    Bonus points for getting it right on first try!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Game Completed */
          <div className="completion-screen">
            <div className="trophy">
              <i className="fas fa-trophy"></i>
            </div>
            <h2 className="completion-title">
              <i className="fas fa-crown icon-margin-right"></i>
              Perfume Master!
            </h2>
            <p className="completion-text">
              <i className="fas fa-medal icon-margin-right"></i>
              You've completed all perfume recipes with expertise!
            </p>
            <div className="final-score">
              <i className="fas fa-star icon-margin-right"></i>
              Final Score: {score}
            </div>
            <button onClick={resetGame} className="btn btn-primary btn-large">
              <i className="fas fa-redo icon-margin-right"></i>
              Play Again
            </button>
          </div>
        )}

        {/* Reset Button */}
        {!gameCompleted && (
          <div className="reset-container">
            <button onClick={resetGame} className="btn btn-secondary">
              <i className="fas fa-sync-alt icon-margin-right"></i>
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfumeFillingGame;