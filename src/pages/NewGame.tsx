  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import player2 from '../assets/players-2.png';
  import player3 from '../assets/players-3.png';
  import player4 from '../assets/players-4.png';
  import confetti from "canvas-confetti";

  const NewGame: React.FC = () => {
    const [selectingPlayers, setSelectingPlayers] = useState<boolean>(true); // Pour gérer l'étape de sélection des joueurs
    
    


    const [playerCount, setPlayerCount] = useState<number>(2);
    const [playerNames, setPlayerNames] = useState<string[]>(["", ""]);
    const [scores, setScores] = useState<number[]>(Array(2).fill(0));
    const [errors, setErrors] = useState<string[]>(Array(playerCount).fill(""));
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

    const [htmlSubSelection, setHtmlSubSelection] = useState<boolean>(false);
    const [cssSubSelection, setCssSubSelection] = useState<boolean>(false);

    const [playerHtmlCards, setPlayerHtmlCards] = useState<string[][]>(
      Array(playerCount).fill([])
    );
    const [playerCssCards, setPlayerCssCards] = useState<string[][]>(
      Array(playerCount).fill([])
    );

    const [caseOptions] = useState<string[]>([
      "HTML",
      "CSS",
      "Bonus",
      "Malus",
      "No Pair",
    ]);

    const htmlOptions = ["h1", "p", "img", "div"];
    const cssOptions = ["color", "background-color", "font-size", "border-radius"];

    const bonusOptions = [
      "Copy Pasta: Steal a pair",
      "Extra Turn: Replay",
      "Semantic Superstar: Bonus points for semantic tags",
      "Dark Mode: Double points for CSS",
    ];
    
    const malusOptions = [
      "Bug: Attach to a card; it no longer counts",
      "Broken Tag: Lose a previously collected card",
      "Syntax Error: Skip next turn",
      "404 Redirect: Exchange CSS cards",
    ];

    const getRandomOption = (options: string[]) => {
      return options[Math.floor(Math.random() * options.length)];
    };

    const handleStartGame = () => {
      setScores(Array(playerCount).fill(0));
      setPlayerHtmlCards(Array(playerCount).fill([]));
      setPlayerCssCards(Array(playerCount).fill([]));
      setGameStarted(true);
    };

    const handleNextTurn = () => {
      setHtmlSubSelection(false);
      setCssSubSelection(false);
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerCount);
      checkEndGame(); 
    };

    const checkEndGame = () => {
      const winnerIndex = playerHtmlCards.findIndex(
        (htmlCards, index) =>
          htmlCards.length === 4 && playerCssCards[index].length === 4
      );
    
      if (winnerIndex !== -1) {
        setGameStarted(false);
        setGameEnded(true);
        confetti({
          particleCount: 1000,
          spread: 500,
          origin: { y: 0.4 },
        });
        alert(`🎉 ${playerNames[winnerIndex]} has won the game! 🎉`);
      }
    };
    
    

    const handleEndGame = () => {
      setGameStarted(false);
      setGameEnded(true);

      confetti({
        particleCount: 1000,
        spread: 500,
        origin: { y: 0.4 },
      });
    };

    const handleHtmlSelection = (selectedTag: string) => {
      const currentHtmlCards = playerHtmlCards[currentPlayerIndex];
      if (currentHtmlCards.includes(selectedTag)) {
        alert(`${selectedTag} a déjà été choisi.`);
        return;
      }

      alert(
        `${playerNames[currentPlayerIndex]} win 2 points for ${selectedTag}!`
      );

      setPlayerHtmlCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[currentPlayerIndex] = [
          ...newCards[currentPlayerIndex],
          selectedTag,
        ];
        return newCards;
      });

      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentPlayerIndex] += 2;
        return newScores;
      });

      handleNextTurn();
    };

    const handleCssSelection = (selectedProperty: string) => {
      const currentHtmlCards = playerHtmlCards[currentPlayerIndex];
      const currentCssCards = playerCssCards[currentPlayerIndex];

      if (currentCssCards.includes(selectedProperty)) {
        alert(
          `${selectedProperty} a déjà été utilisé par ${playerNames[currentPlayerIndex]}.`
        );
        return;
      }

      if (currentHtmlCards.length === currentCssCards.length) {
        alert(
          `Aucune balise HTML disponible pour associer avec ${selectedProperty}.`
        );
        return;
      }

      const availableHtmlCard = currentHtmlCards[currentCssCards.length];
      const pair = `${availableHtmlCard}-${selectedProperty}`;

      if (
        currentCssCards.some(
          (cssCard, index) => `${currentHtmlCards[index]}-${cssCard}` === pair
        )
      ) {
        alert(`La paire ${availableHtmlCard} et ${selectedProperty} existe déjà.`);
        return;
      }

      alert(
        `${playerNames[currentPlayerIndex]} win 2 points for ${selectedProperty}!`
      );

      setPlayerCssCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[currentPlayerIndex] = [
          ...newCards[currentPlayerIndex],
          selectedProperty,
        ];
        return newCards;
      });

      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentPlayerIndex] += 2;
        return newScores;
      });

      handleNextTurn();
    };

    const handleCaseSelection = (selectedCase: string) => {
      if (selectedCase === "HTML") {
        setHtmlSubSelection(true);
      } else if (selectedCase === "CSS") {
        if (
          playerHtmlCards[currentPlayerIndex].length ===
          playerCssCards[currentPlayerIndex].length
        ) {
          alert(`Aucune balise HTML disponible pour associer avec une propriété CSS.`);
          return;
        }
        setCssSubSelection(true);
      } else if (selectedCase === "Bonus") {
        const bonus = getRandomOption(bonusOptions);
        alert(`${playerNames[currentPlayerIndex]} wins a bonus: ${bonus}`);
        handleBonusEffect(bonus); // Utilisation de la nouvelle fonction
      } else if (selectedCase === "Malus") {
        const malus = getRandomOption(malusOptions);
        alert(`${playerNames[currentPlayerIndex]} receives a penalty: ${malus}`);
        handleMalusEffect(malus); // Utilisation de la nouvelle fonction
      } else {
        alert(`${playerNames[currentPlayerIndex]} choose ${selectedCase}.`);
        handleNextTurn();
      }
    };
    

    return (
      <div>
        <h1>New Game</h1>

        {selectingPlayers && (
  <div className="player">
    <h2>Choose number of players</h2>
    {[2, 3, 4].map((count) => {
      const playerImages = {
        2: player2,
        3: player3,
        4: player4,
      };

      return (
        <button className="player-button"
          key={count}
          onClick={() => {
            setPlayerCount(count);
            setScores(Array(count).fill(0));
            setPlayerHtmlCards(Array(count).fill([]));
            setPlayerCssCards(Array(count).fill([]));
            setPlayerNames(Array(count).fill(""));
            setErrors(Array(count).fill(""));
            setSelectingPlayers(false);
          }}
        >
          <img
            src={playerImages[count as keyof typeof playerImages]}
            alt={`${count} Players`}
            style={{ width: "100%" }}
          />

        </button>
      );
    })}
  </div>
)}
{!selectingPlayers && !gameStarted && !gameEnded && (
  <>
    <h2>Player's name</h2>
    {playerNames.map((name, index) => (
      <div key={index}>
        <label htmlFor={`player-${index}`}>Player {index + 1}:</label>
        <input
          id={`player-${index}`}
          type="text"
          value={name}
          onChange={(e) =>
            setPlayerNames((prevNames) => {
              const newNames = [...prevNames];
              newNames[index] = e.target.value;
              return newNames;
            })
          }
        />
        {errors[index] && <p style={{ color: "red" }}>{errors[index]}</p>}
      </div>
    ))}
    <button onClick={handleStartGame}>Start the game</button>
  </>
)}

        {gameStarted && !htmlSubSelection && !cssSubSelection && (
          <div className="homepage">
            <h2>It's {playerNames[currentPlayerIndex]}'s turn!</h2>
            <p>Select a case:</p>
            <div className="cards">
              {caseOptions.map((caseOption, index) => (
                <button
                  key={index}
                  onClick={() => handleCaseSelection(caseOption)}
                >
                  {caseOption}
                </button>
              ))}
            </div>
            <p>
              <strong>HTML Cards:</strong>{" "}
              {playerHtmlCards[currentPlayerIndex].join(", ") || "None"}
            </p>
            <p>
              <strong>CSS Cards:</strong>{" "}
              {playerCssCards[currentPlayerIndex].join(", ") || "None"}
            </p>
          </div>
        )}

        {htmlSubSelection && (
          <div className="homepage">
            <h2>Choose an HTML tag</h2>
            <div className="cards">
              {htmlOptions.map((tag, index) => (
                <button key={index} onClick={() => handleHtmlSelection(tag)}>
                  {tag}
                </button>
              ))}
            </div>
            <button onClick={() => setHtmlSubSelection(false)}>Retour</button>
          </div>
        )}

        {cssSubSelection && (
          <div className="homepage">
            <h2>Choose a CSS property</h2>
            <div className="cards">
              {cssOptions.map((property, index) => (
                <button key={index} onClick={() => handleCssSelection(property)}>
                  {property}
                </button>
              ))}
            </div>
            <button onClick={() => setCssSubSelection(false)}>Retour</button>
          </div>
        )}

        {gameEnded && (
          <div>
            <h2>Game Over!</h2>
            <h3>Scores:</h3>
            <ul>
              {playerNames.map((name, index) => (
                <li key={index}>
                  {name}: {scores[index]} points
                </li>
              ))}
            </ul>
            <Link to="/">
              <button>Back to Home</button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  export default NewGame;
