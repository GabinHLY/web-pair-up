{showRoulette && (
    <div>
      <h2>Spin the wheel!</h2>
      <RoulettePro
        prizes={rouletteItems}
        prizeIndex={Math.floor(Math.random() * rouletteItems.length)}
        onPrizeDefined={(prizeIndex) => handleRouletteEnd(rouletteItems[prizeIndex])}
        radius={100} // Ajustez la taille de la roulette
      />
    </div>
  )}
  