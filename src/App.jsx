import { useState, useEffect } from 'react';
import './App.scss';
import cards from './assets/data/cards';
import drawAudio from '/sounds/draw.mp3';
import battleAudio from '/sounds/battle.mp3';
import winAudio from '/sounds/win.mp3';
import mute from '/images/mute.png';
import volume from '/images/volume.png';

function App() {

  // States
  const [deck, setDeck] = useState(cards);

  const [deckPlayer1, setDeckPlayer1] = useState(cards.slice(0, 16));
  const [deckPlayer2, setDeckPlayer2] = useState(cards.slice(16, 32));

  const [deckPlayer1Remaining, setDeckPlayer1Remaining] = useState(deckPlayer1.length);
  const [deckPlayer2Remaining, setDeckPlayer2Remaining] = useState(deckPlayer2.length);

  const [drawCardDeckPlayer1, setDrawCardDeckPlayer1] = useState([]);
  const [drawCardDeckPlayer2, setDrawCardDeckPlayer2] = useState([]);

  const [deckOnGamePlayer1, setDeckOnGamePlayer1] = useState([]);
  const [deckOnGamePlayer2, setDeckOnGamePlayer2] = useState([]);

  const [deckBattlePlayer1, setDeckBattlePlayer1] = useState([]);
  const [deckBattlePlayer2, setDeckBattlePlayer2] = useState([]);

  const [cardsWinOnBattleToShow, setCardsWinOnBattleToShow] = useState([]);

  const [noSound, setNoSound] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [battle, setBattle] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const [waitPlayer1, setWaitPlayer1] = useState(false);
  const [waitPlayer2, setWaitPlayer2] = useState(false);

  const [startBattlePlayer1, setStartBattlePlayer1] = useState(false);
  const [startBattlePlayer2, setStartBattlePlayer2] = useState(false);

  const [isBattlePlayer1, setIsBattlePlayer1] = useState(false);
  const [isBattlePlayer2, setIsBattlePlayer2] = useState(false);

  const [flipCardPlayer1, setFlipCardPlayer1] = useState(false);
  const [flipCardPlayer2, setFlipCardPlayer2] = useState(false);

  const [roundWinnerPlayer1, setRoundWinnerPlayer1] = useState(false);
  const [roundWinnerPlayer2, setRoundWinnerPlayer2] = useState(false);

  const [disapearCardPlayer1, setDisapearCardPlayer1] = useState(false);
  const [disapearCardPlayer2, setDisapearCardPlayer2] = useState(false);

  const [endOfDeckPlayer1, setEndOfDeckPlayer1] = useState(false);
  const [endOfDeckPlayer2, setEndOfDeckPlayer2] = useState(false);

  const [gameOverPlayer1, setGameOverPlayer1] = useState(false);
  const [gameOverPlayer2, setGameOverPlayer2] = useState(false);

  // Sounds
  const drawSound = new Audio(drawAudio);
  const battleSound = new Audio(battleAudio);
  const winSound = new Audio(winAudio);

  // Turn sound On/Off
  const soundMode = () => {
    setNoSound(!noSound);
  };

  // Shuffle cards array
  const fisherYatesShuffle = (array) => {
    for (let i = array.length-1; i > 0; i--) {
      let j = Math.floor( Math.random() * (i + 1)); //random index
      [array[i], array[j]] = [array[j], array[i]]; // swap
    };
  };

  // Start game
  const startGame = () => {
    setIsGameStarted(true);
    setShowRules(false);
    fisherYatesShuffle(cards);
    setDeckPlayer1(deck.slice(0,16));
    setDeckPlayer2(deck.slice(16, 32));
    setDeckPlayer1Remaining(deckPlayer1.length);
    setDeckPlayer2Remaining(deckPlayer2.length);
  };

  // Show or hide rules
  const showRulesAgain = () => {
    setShowRules(!showRules);
  };

  // Go to home to start a new game
  const showHome = () => {
    setDeck(cards);
    setDeckPlayer1(cards.slice(0, 16));
    setDeckPlayer2(cards.slice(16, 32));
    setDrawCardDeckPlayer1([]);
    setDrawCardDeckPlayer2([]);
    setDeckOnGamePlayer1([]);
    setDeckOnGamePlayer2([]);
    setDeckBattlePlayer1([]);
    setDeckBattlePlayer2([]);
    setCardsWinOnBattleToShow([]);
    setIsGameStarted(false);
    setShowRules(true);
    setBattle(false);
    setShowCards(false);
    setWaitPlayer1(false);
    setWaitPlayer2(false);
    setStartBattlePlayer1(false);
    setStartBattlePlayer2(false);
    setIsBattlePlayer1(false);
    setIsBattlePlayer2(false);
    setFlipCardPlayer1(false);
    setFlipCardPlayer2(false);
    setRoundWinnerPlayer1(false);
    setRoundWinnerPlayer2(false);
    setDisapearCardPlayer1(false);
    setDisapearCardPlayer2(false);
    setEndOfDeckPlayer1(false);
    setEndOfDeckPlayer2(false);
    setGameOverPlayer1(false);
    setGameOverPlayer2(false);
  };

  // Show cards remaining from deckPlayer 1
  useEffect(() => {
    setDeckPlayer1Remaining(deckPlayer1.length);
    setDeckPlayer2Remaining(deckPlayer2.length);
  }, [deckPlayer1Remaining]);

  // Show cards remaining from deckPlayer 2
  useEffect(() => {
    setDeckPlayer1Remaining(deckPlayer1.length);
    setDeckPlayer2Remaining(deckPlayer2.length);
  }, [deckPlayer2Remaining]);

  // Draw a card from deck player 1
  const drawCardPlayer1 = () => {
    setDisapearCardPlayer1(false);
    setDrawCardDeckPlayer1([deckPlayer1[0]]);
    setDeckOnGamePlayer1(deckPlayer1.splice(0, 1));
    setDeckPlayer1Remaining(deckPlayer1.length);
    setWaitPlayer1(true);
    setIsBattlePlayer1(false);
    setFlipCardPlayer1(true);
    if (!noSound) {
      drawSound.play();
    };
    if (deckPlayer1Remaining === 1) {
      setEndOfDeckPlayer1(true);
    };
  };

  // Draw a card from deck player 2
  const drawCardPlayer2 = () => {
    setDisapearCardPlayer2(false);
    setDrawCardDeckPlayer2([deckPlayer2[0]]);
    setDeckOnGamePlayer2(deckPlayer2.splice(0, 1));
    setDeckPlayer2Remaining(deckPlayer2.length);
    setWaitPlayer2(true);
    setIsBattlePlayer2(false);
    setFlipCardPlayer2(true);
    if (!noSound) {
      drawSound.play();
    };
    if (deckPlayer2Remaining === 1) {
      setEndOfDeckPlayer2(true);
    };
  };

  // Draw a card from deck player 1 when there is battle
  const drawBattleCardPlayer1 = () => {
    setFlipCardPlayer1(false);
    setIsBattlePlayer1(true);
    setDrawCardDeckPlayer1([deckPlayer1[0]]);
    setDeckBattlePlayer1([...deckBattlePlayer1, deckOnGamePlayer1.splice(0, 1), deckPlayer1.splice(0, 1)]);
    setDeckPlayer1Remaining(deckPlayer1.length);
    setWaitPlayer1(false);
    setStartBattlePlayer1(false);
    if (!noSound) {
      drawSound.play();
    };
    if (deckPlayer1Remaining === 1) {
      setEndOfDeckPlayer1(true);
    };
  };

  // Draw a card from deck player 2 when there is battle
  const drawBattleCardPlayer2 = () => {
    setFlipCardPlayer2(false);
    setIsBattlePlayer2(true);
    setDrawCardDeckPlayer2([deckPlayer2[0]]);
    setDeckBattlePlayer2([...deckBattlePlayer2, deckOnGamePlayer2.splice(0, 1), deckPlayer2.splice(0, 1)]);
    setDeckPlayer2Remaining(deckPlayer2.length);
    setWaitPlayer2(false);
    setStartBattlePlayer2(false);
    if (!noSound) {
      drawSound.play();
    };
    if (deckPlayer2Remaining === 1) {
      setEndOfDeckPlayer2(true);
    };
  };

  // Animations when there is battle
  const onBattle = () => {
    if (!noSound) {
      battleSound.play();
    };
    setBattle(true);
    setTimeout(() => {
      setBattle(false)
    }, 750);
  };

  // Animations when show hidden cards
  const onShowCards = () => {
    setTimeout(() => {
      setShowCards(true);
      setDisapearCardPlayer1(false);
    }, 1250);
    setTimeout(() => {
      setDisapearCardPlayer1(true);
    }, 2500);
    setTimeout(() => {
      setShowCards(false);
    }, 3000);
  };
  
  // Animations when Player 1 wins
  const onRoundWinPlayer1 = () => {
    setTimeout(() => {
      setDisapearCardPlayer1(true);
      setDisapearCardPlayer2(true);
    }, 1000);
    setTimeout(() => {
      if (deckPlayer1Remaining !== 0 || deckPlayer2Remaining !== 0) {
        setEndOfDeckPlayer1(false);
        setEndOfDeckPlayer2(false);
      };
      if (deckPlayer2Remaining === 0) {
        setGameOverPlayer2(true);
        if (!noSound) {
          winSound.play();
        };
      };
      setRoundWinnerPlayer1(true);
      setDrawCardDeckPlayer1([]);
      setDrawCardDeckPlayer2([]);
    }, 1250);
    setTimeout(() => {
      setFlipCardPlayer1(false);
      setFlipCardPlayer2(false);
    }, 1300);
    setTimeout(() => {
      setRoundWinnerPlayer1(false);
    }, 1750);
  };

  // Animations when Player 2 wins
  const onRoundWinPlayer2 = () => {
    setTimeout(() => {
      setDisapearCardPlayer1(true);
      setDisapearCardPlayer2(true);
    }, 1000);
    setTimeout(() => {
      if (deckPlayer2Remaining !== 0 || deckPlayer1Remaining !== 0) {
        setEndOfDeckPlayer1(false);
        setEndOfDeckPlayer2(false);
      };
      if (deckPlayer1Remaining === 0) {
        setGameOverPlayer1(true);
        if (!noSound) {
          winSound.play();
        };
      };
      setRoundWinnerPlayer2(true);
      setDrawCardDeckPlayer1([]);
      setDrawCardDeckPlayer2([]);
    }, 1250);
    setTimeout(() => {
      setFlipCardPlayer1(false);
      setFlipCardPlayer2(false);
    }, 1300);
    setTimeout(() => {
      setRoundWinnerPlayer2(false);
    }, 1750);
  };

  // Game functions
  if (waitPlayer1 && waitPlayer2) {
    setWaitPlayer1(false);
    setWaitPlayer2(false);

    // If Player1 wins the round
    if (deckOnGamePlayer1[0].value > deckOnGamePlayer2[0].value) {
      setIsBattlePlayer1(false);
      setIsBattlePlayer2(false);
      
      // If there is a battle

      // 1) Combine cards in play
      const cardsWinOnBattlePlayer1 = deckBattlePlayer1.map((cardWinDeck1) => cardWinDeck1);
      const cardsWinOnBattlePlayer2 = deckBattlePlayer2.map((cardWinDeck2) => cardWinDeck2);
      const cardsWinOnBattleArrayConcat = [];
      cardsWinOnBattleArrayConcat.push(...cardsWinOnBattlePlayer1, ...cardsWinOnBattlePlayer2);

      // 2) Prepare cards thaht will return to the winning deck
      const cardsWinOnBattlePlayer1GoToDeck = [];
      cardsWinOnBattlePlayer1.map((card) => {
        card.forEach((c) => cardsWinOnBattlePlayer1GoToDeck.push(c));
       });

      const cardsWinOnBattlePlayer2GoToDeck = [];
      cardsWinOnBattlePlayer2.map((card) => {
        card.forEach((c) => cardsWinOnBattlePlayer2GoToDeck.push(c));
       });

       // 3) Prepare hidden cards to be shown
      const cardsWinOnBattleArray = [];
      cardsWinOnBattleArrayConcat.map((card) => {
        card.forEach((c) => cardsWinOnBattleArray.push(c));
      });
      const cardsWinOnBattleToShowOddIndex = [];
      for (let i = 0; i < cardsWinOnBattleArray.length; i++) {
        if ((i % 2) == 1) {
          cardsWinOnBattleToShowOddIndex.push(cardsWinOnBattleArray[i]);
        };
      };
      setCardsWinOnBattleToShow(cardsWinOnBattleToShowOddIndex);

      // If there is no battle
      if (cardsWinOnBattleArray.length === 0) {
        setDeckPlayer1([...deckPlayer1, deckOnGamePlayer1[0], deckOnGamePlayer2[0]]);

      // Or if there is battle, cards won return to the winning deck in the good order
      } else {
        setDeckPlayer1([...deckPlayer1, ...cardsWinOnBattlePlayer1GoToDeck , deckOnGamePlayer1[0], ...cardsWinOnBattlePlayer2GoToDeck, deckOnGamePlayer2[0]]);
        onShowCards();
      };
      setDeckBattlePlayer1([]);
      setDeckBattlePlayer2([]);
      setDeckOnGamePlayer1([]);
      setDeckOnGamePlayer2([]);
      onRoundWinPlayer1();

    // If Player2 wins the round
    } else if (deckOnGamePlayer1[0].value < deckOnGamePlayer2[0].value) {
      setIsBattlePlayer1(false);
      setIsBattlePlayer2(false);

      // If there is a battle

      // 1) Combine cards in play
      const cardsWinOnBattlePlayer1 = deckBattlePlayer1.map((cardWinDeck1) => cardWinDeck1);
      const cardsWinOnBattlePlayer2 = deckBattlePlayer2.map((cardWinDeck2) => cardWinDeck2);
      const cardsWinOnBattleArrayConcat = [];
      cardsWinOnBattleArrayConcat.push(...cardsWinOnBattlePlayer2, ...cardsWinOnBattlePlayer1);

      // 2) Prepare cards thaht will return to the winning deck
      const cardsWinOnBattlePlayer1GoToDeck = [];
      cardsWinOnBattlePlayer1.map((card) => {
        card.forEach((c) => cardsWinOnBattlePlayer1GoToDeck.push(c));
       });

      const cardsWinOnBattlePlayer2GoToDeck = [];
      cardsWinOnBattlePlayer2.map((card) => {
        card.forEach((c) => cardsWinOnBattlePlayer2GoToDeck.push(c));
       });

      // 3) Prepare hidden cards to be shown
      const cardsWinOnBattleArray = [];
      cardsWinOnBattleArrayConcat.map((card) => {
        card.forEach((c) => cardsWinOnBattleArray.push(c));
      });
      const cardsWinOnBattleToShowOddIndex = [];
      for (let i = 0; i < cardsWinOnBattleArray.length; i++) {
        if ((i % 2) == 1) {
          cardsWinOnBattleToShowOddIndex.push(cardsWinOnBattleArray[i]);
        };
      };
      setCardsWinOnBattleToShow(cardsWinOnBattleToShowOddIndex);

      // If there is no battle
      if (cardsWinOnBattleArray.length === 0) {
        setDeckPlayer2([...deckPlayer2, deckOnGamePlayer2[0], deckOnGamePlayer1[0]]);

      // Or if there is battle, cards won return to the winning deck in the good order
      } else {
        //const cardsWinBattleGoToDeck = cardsWinOnBattleArray.map((c) => c);
        setDeckPlayer2([...deckPlayer2, ...cardsWinOnBattlePlayer2GoToDeck, deckOnGamePlayer2[0], ...cardsWinOnBattlePlayer1GoToDeck, deckOnGamePlayer1[0]]);
        onShowCards();
      };
      setDeckBattlePlayer1([]);
      setDeckBattlePlayer2([]);
      setDeckOnGamePlayer1([]);
      setDeckOnGamePlayer2([]);
      onRoundWinPlayer2();

    // When there is battle
    }  else if (deckOnGamePlayer1[0].value === deckOnGamePlayer2[0].value) {
      onBattle();

      // Check how many cards remain into deckPlayer1
      if (deckPlayer1Remaining === 0) {
        setTimeout(() => {
          setGameOverPlayer1(true);
          if (!noSound) {
            winSound.play();
          };
        }, 1750);

      // Check how many cards remain into deckPlayer2
      } else if (deckPlayer2Remaining === 0) {
        setTimeout(() => {
          setGameOverPlayer2(true);
          if (!noSound) {
            winSound.play();
          };
        }, 1750);
      } else {
        setStartBattlePlayer1(true);
        setStartBattlePlayer2(true);
      }
    }
  };

  // Set game over player 1 when there is batlle and no card left in deck player 1
  if (deckPlayer1Remaining === 0 && isBattlePlayer1) {
    setTimeout(() => {
      setGameOverPlayer1(true);
      if (!noSound) {
        winSound.play();
      };
    }, 1250);
  };

  // Set game over player 2 when there is batlle and no card left in deck player 2
  if (deckPlayer2Remaining === 0 && isBattlePlayer2) {
    setTimeout(() => {
      setGameOverPlayer2(true);
      if (!noSound) {
        winSound.play();
      };
    }, 1250);
  };

  return (
    <div className="App">
      <div className={showRules ? "App-home" : "App-home-norules"}>
        <h1 className="App-home-header">
            La bataille
        </h1>
        {isGameStarted && (
        <div className="App-home-options">
          <div className="App-home-options-showrules">
            <button
              className="App-home-options-showrules-button"
              onClick={showRulesAgain}
            >
              Voir / Masquer les règles
            </button>
          </div>
          <div className="App-home-options-startnew">
            <button
              className="App-home-options-startnew-button"
              onClick={showHome}
            >
              Nouvelle partie
            </button>
          </div>
          <div className="App-home-options-volume">
            {!noSound && (
              <button
                className="App-home-options-volume-button-on"
                onClick={soundMode}
              >
                <img
                  className='App-home-options-volume-button-on'
                  src={volume}
                  alt="volume"
                />
              </button>
            )}
            {noSound && (
              <button
                className="App-home-options-volume-button-off"
                onClick={soundMode}
              >
                <img
                  className='App-home-options-volume-button-off-img'
                  src={mute}
                  alt="volume muet"
                />
              </button>
            )}
          </div>
        </div>
        )}
        {showRules && (
          <div className="App-home-rules">
            <div className="App-home-rules-header">
              Règles du jeu
            </div>
            <div className="App-home-rules-desc">
              <p className="App-home-rules-desc-text">
                La bataille se joue généralement à deux. On distribue les 32 cartes aux joueurs qui les rassemblent face cachée en paquet devant eux.
              </p>
              <p className="App-home-rules-desc-text">
                Chacun tire la carte du dessus de son paquet et la pose face visible sur la table.
              </p>
                Celui qui a la carte la plus forte ramasse les autres cartes. L'as est la plus forte carte, puis roi, dame, valet, 10, etc.
              <p className="App-home-rules-desc-text">
                Lorsque deux joueurs posent deux cartes de même valeur, il y a "bataille". Les joueurs tirent la carte suivante et la posent, face cachée, sur la carte précédente.
              </p>
              <p className="App-home-rules-desc-text">
                Puis, ils tirent une deuxième carte qu'ils posent cette fois-ci face découverte et c'est cette dernière qui départagera les joueurs. Celui qui la valeur la plus forte, l'emporte.
              </p>
              <p className="App-home-rules-desc-text">
                Le gagnant est celui qui remporte toutes les cartes du paquet. S'il y a bataille et qu'un joueur n'a plus de carte pour disputer cette bataille, il perd la partie.
              </p>
            </div>
          </div>
        )}
        {!isGameStarted && (
          <button onClick={startGame} className="App-home-button">&gt;&gt; Jouer &lt;&lt; </button>
        )}
      </div>
      {isGameStarted && (
        <div className="App-area">
          <div className="App-area-player1">
            <div className="App-area-player1-name">Player 1</div>
            <div className="App-area-player1-game">
              <div className="App-area-player1-game-deck">
                <div className="App-area-player1-game-deck-button">
                <div className={endOfDeckPlayer1 ? "App-area-player1-game-deck-ghost" : "App-area-player1-game-deck-ghost-none"}></div>
                  <button
                    className={endOfDeckPlayer1 ? "App-area-player1-game-deck-button-back-empty" : "App-area-player1-game-deck-button-back"}
                    onClick={startBattlePlayer1 ? drawBattleCardPlayer1 : drawCardPlayer1}
                    disabled={startBattlePlayer1 ? false : (isBattlePlayer1 ? false : true)}
                    aria-label="start-game"
                  >
                  </button>
                  <button
                    className={endOfDeckPlayer1 ? "App-area-player1-game-deck-button-back-empty" : (flipCardPlayer1 ? "App-area-player1-game-deck-button-draw activeBackPlayer1" : (gameOverPlayer1 ? "App-area-player1-game-deck-button-back-over" : "App-area-player1-game-deck-button-draw"))}
                    onClick={startBattlePlayer1 ? drawBattleCardPlayer1 : drawCardPlayer1}
                    disabled={waitPlayer1 ? true : (showCards ? true : (flipCardPlayer1 ? true : false))}
                    aria-label="start-game"
                  >
                  </button>
                </div>
                {deck && (
                  <div className="App-area-player1-game-deck-count">
                    <p className="App-area-player1-game-deck-count-text">
                      Cartes restantes
                    </p>
                    <em className={roundWinnerPlayer1 ? "emWin" : "em"}>{deckPlayer1Remaining}</em>
                  </div>
                )}
              </div>
              <div className={isBattlePlayer1 ? "App-area-player1-game-deck-button-draw activeSwipePlayer1" : (flipCardPlayer1 ? "App-area-player1-game-play activeFrontPlayer1" : "App-area-player1-game-play")}>
                {drawCardDeckPlayer1.map((c) => (
                  <img
                    key={c.id}
                    src={c.image}
                    alt={c.id}
                    className={isBattlePlayer1 ? "hidden" : (disapearCardPlayer1 ? "App-area-player1-game-play-img-disapear" : "App-area-player1-game-play-img")}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={battle ? "App-area-battle" : "hidden"}>BATAILLE</div>
          {showCards && (
            <div className="App-area-battle-show">
              <div className="App-area-battle-show-all">
                <div className="App-area-battle-show-all-desc">
                  Cartes face cachée gagnées
                </div>
                <div className="App-area-battle-show-all-cards">
                  {cardsWinOnBattleToShow.map((card) => (
                    <img
                      key={card.id}
                      src={card.image}
                      alt={card.id}
                      className={disapearCardPlayer1 ? "App-area-player1-game-play-img-disapear" : "App-area-player1-game-play-img"}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {gameOverPlayer1 && (
            <div className="App-area-gameOver">
              <div className="App-area-gameOver-text">
                VICTOIRE PLAYER 2 !!!
              </div>
              <button
                className="App-area-gameOver-button"
                onClick={showHome}
              >
                Nouvelle partie
              </button>
            </div>
          )}
          {gameOverPlayer2 && (
            <div className="App-area-gameOver">
              <div className="App-area-gameOver-text">
                VICTOIRE PLAYER 1 !!!
              </div>
              <button
                className="App-area-gameOver-button"
                onClick={showHome}
              >
                Nouvelle partie
              </button>
            </div>
          )}
          <div className="App-area-player2">
            <div className="App-area-player2-name">Player 2</div>
            <div className="App-area-player2-game">
              <div className={isBattlePlayer2 ? "App-area-player2-game-deck-button-draw activeSwipePlayer2" : (flipCardPlayer2 ? "App-area-player2-game-play activeFrontPlayer2" : "App-area-player2-game-play")}>
                {drawCardDeckPlayer2.map((c) => (
                  <img
                    key={c.id}
                    src={c.image}
                    alt={c.id}
                    className={isBattlePlayer2 ? "hidden" : (disapearCardPlayer2 ? "App-area-player2-game-play-img-disapear" : "App-area-player2-game-play-img")}
                  />
                ))}
              </div>
              <div className="App-area-player2-game-deck">
                <div className="App-area-player2-game-deck-button">
                  <div className={endOfDeckPlayer2 ? "App-area-player2-game-deck-ghost" : "App-area-player2-game-deck-ghost-none"}></div>
                  <button
                    className={endOfDeckPlayer2 ? "App-area-player2-game-deck-button-back-empty" : "App-area-player2-game-deck-button-back"}
                    onClick={startBattlePlayer2 ? drawBattleCardPlayer2 : drawCardPlayer2}
                    disabled={startBattlePlayer2 ? false : (isBattlePlayer2 ? false : true)}
                    aria-label="start-game"
                  >
                  </button>
                  <button
                    className={endOfDeckPlayer2 ? "App-area-player2-game-deck-button-back-empty" : (flipCardPlayer2 ? "App-area-player2-game-deck-button-draw activeBackPlayer2" : (gameOverPlayer2 ? "App-area-player2-game-deck-button-back-over" : "App-area-player2-game-deck-button-draw"))}
                    onClick={startBattlePlayer2 ? drawBattleCardPlayer2 : drawCardPlayer2}
                    disabled={waitPlayer2 ? true : (showCards ? true : (flipCardPlayer2 ? true : false))}
                    aria-label="start-game"
                  >
                  </button>
                </div>
                {deck && (
                  <div className="App-area-player2-game-deck-count">
                    <p className="App-area-player2-game-deck-count-text">
                      Cartes restantes
                    </p>
                    <em className={roundWinnerPlayer2 ? "emWin" : "em"}>{deckPlayer2Remaining}</em>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
