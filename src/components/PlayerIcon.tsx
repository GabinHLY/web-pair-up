import React from 'react';

const PlayerIcon = () => (
  <svg width="30" height="28" viewBox="0 0 92 85" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="92" height="85" fill="url(#pattern0_51_24)"/>
    <rect width="92" height="85" fill="#D1E5B2" style={{ mixBlendMode: 'lighten' }}/>
    <defs>
      <pattern id="pattern0_51_24" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_51_24" transform="matrix(0.00195312 0 0 0.00211397 0 -0.0411765)"/>
      </pattern>
      <image id="image0_51_24" width="512" height="512" xlinkHref="data:image/png;base64,..."/>
    </defs>
  </svg>
);

function PlayerIcon() {
  

  return (
    {selectingPlayers && (
      <div>
        <h2>Choisissez le nombre de joueurs</h2>
        {[2, 3, 4].map((count) => (
          <button
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
            {[...Array(count)].map((_, idx) => (
              <PlayerIcon key={idx} style={{ width: '30px', height: '30px', margin: '0 5px' }} />
            ))}
          </button>
        ))}
      </div>
    )}
  );
}

export default PlayerIcon;
