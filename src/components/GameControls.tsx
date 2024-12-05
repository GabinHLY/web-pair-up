interface GameControlsProps {
  onStartGame: () => void; // Fonction pour démarrer le jeu
  onNextTurn: () => void; // Fonction pour passer au tour suivant
  isGameActive: boolean; // Indique si le jeu est actif
  playerCount: number; // Nombre de joueurs
  currentPlayerIndex: number; // Index du joueur actuel
  playerNames: string[]; // Liste des noms des joueurs
}

export function GameControls({
  onStartGame,
  onNextTurn,
  isGameActive,
  playerCount,
  currentPlayerIndex,
  playerNames,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Bouton pour démarrer le jeu */}
      {!isGameActive && (
        <button
          onClick={onStartGame}
          disabled={playerCount < 2}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Game
        </button>
      )}

      {/* Section active quand le jeu est en cours */}
      {isGameActive && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-bold">
            It's {playerNames[currentPlayerIndex]}'s turn!
          </h2>
          <button
            onClick={onNextTurn}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Next Turn
          </button>
        </div>
      )}
    </div>
  );
}
