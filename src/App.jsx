import { useState, useEffect } from 'react';
import './App.scss';
import cards from './assets/data/cards'
import drawAudio from '../draw.mp3';
import battleAudio from '../battle.mp3';

function App() {
  const [deckId, setDeckId] = useState();
  const [drawCardDeckPlayer1, setDrawCardDeckPlayer1] = useState([]);
  const [drawCardDeckPlayer2, setDrawCardDeckPlayer2] = useState([]);
  const [waitPlayer1, setWaitPlayer1] = useState(false);
  const [waitPlayer2, setWaitPlayer2] = useState(false);
  const [startBattlePlayer1, setStartBattlePlayer1] = useState(false);
  const [startBattlePlayer2, setStartBattlePlayer2] = useState(false);
  const [isBattlePlayer1, setIsBattlePlayer1] = useState(false);
  const [isBattlePlayer2, setIsBattlePlayer2] = useState(false);
  const [deckBattlePlayer1, setDeckBattlePlayer1] = useState([]);
  const [deckBattlePlayer2, setDeckBattlePlayer2] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [battle, setBattle] = useState(false);
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

  const drawSound = new Audio(drawAudio);
  const battleSound = new Audio(battleAudio);

  const [deck, setDeck] = useState(cards);
  const [deckPlayer1, setDeckPlayer1] = useState(cards.slice(0, 26));
  const [deckPlayer2, setDeckPlayer2] = useState(cards.slice(26, 52));
  const [deckPlayer1Remaining, setDeckPlayer1Remaining] = useState(deckPlayer1.length);
  const [deckPlayer2Remaining, setDeckPlayer2Remaining] = useState(deckPlayer2.length);
  const [deckOnGamePlayer1, setDeckOnGamePlayer1] = useState([]);
  const [deckOnGamePlayer2, setDeckOnGamePlayer2] = useState([]);

  const [cardsWinOnBattleToShow, setCardsWinOnBattleToShow] = useState([]);

  // Shuffle cards array
  const fisherYatesShuffle = (array) => {
    for (let i = array.length-1; i > 0; i--) {
      let j = Math.floor( Math.random() * (i + 1)); //random index
      [array[i], array[j]] = [array[j], array[i]]; // swap
    };
  }

  const startGame = () => {
    setIsGameStarted(true);
    setShowRules(false);
    fisherYatesShuffle(cards);
    setDeckPlayer1(deck.slice(0, 26));
    setDeckPlayer2(deck.slice(26, 52));
  };

  useEffect(() => {
    setDeckPlayer1Remaining(deckPlayer1.length);
    setDeckPlayer2Remaining(deckPlayer2.length);
  }, [deckPlayer1Remaining]);

  useEffect(() => {
    setDeckPlayer1Remaining(deckPlayer1.length);
    setDeckPlayer2Remaining(deckPlayer2.length);
  }, [deckPlayer2Remaining]);

  console.log('deck', deck);
  console.log('deck1', deckPlayer1);
  console.log('deck2', deckPlayer2);

  // Draw a card from deck player 1
  const drawCardPlayer1 = () => {
    setDisapearCardPlayer1(false);
    setDrawCardDeckPlayer1([deckPlayer1[0]]);
    setDeckOnGamePlayer1(deckPlayer1.splice(0, 1));
    setDeckPlayer1Remaining(deckPlayer1.length);
    setWaitPlayer1(true);
    setIsBattlePlayer1(false);
    setFlipCardPlayer1(true);
    drawSound.play();
    if (deckPlayer1Remaining === 1) {
      setEndOfDeckPlayer1(true);
    }
    console.log('newDeck1', deckPlayer1);
  };
    console.log('deckOnGame1', deckOnGamePlayer1);
    console.log('deckOnGame2', deckOnGamePlayer2);
    console.log('deckBattlePlayer1', deckBattlePlayer1);
    console.log('deckBattlePlayer2', deckBattlePlayer2);
    console.log('cardsWinOnBattleToShow', cardsWinOnBattleToShow);



  // Draw a card from deck player 2
  const drawCardPlayer2 = () => {
    setDisapearCardPlayer2(false);
    setDrawCardDeckPlayer2([deckPlayer2[0]]);
    setDeckOnGamePlayer2(deckPlayer2.splice(0, 1));
    setDeckPlayer2Remaining(deckPlayer2.length);
    setWaitPlayer2(true);
    setIsBattlePlayer2(false);
    setFlipCardPlayer2(true);
    drawSound.play();
    if (deckPlayer2Remaining === 1) {
      setEndOfDeckPlayer2(true);
    }
  };

  // Draw a card from deck player 1 when battle
  const drawBattleCardPlayer1 = () => {
    if (deckPlayer2Remaining === 0) {
      setGameOverPlayer2(true);
    };
    setIsBattlePlayer1(true);
    setDrawCardDeckPlayer1([deckPlayer1[0]]);
    setDeckBattlePlayer1([...deckBattlePlayer1, deckOnGamePlayer1.splice(0, 1), deckPlayer1.splice(0, 1)]);
    setDeckPlayer1Remaining(deckPlayer1.length);
    setWaitPlayer1(false);
    setStartBattlePlayer1(false);
    drawSound.play();
  };

  // Draw a card from deck player 2 when battle
  const drawBattleCardPlayer2 = () => {
    if (deckPlayer1Remaining === 0) {
      setGameOverPlayer1(true);
    };
    setIsBattlePlayer2(true);
    setDrawCardDeckPlayer2([deckPlayer2[0]]);
    setDeckBattlePlayer2([...deckBattlePlayer2, deckOnGamePlayer2.splice(0, 1), deckPlayer2.splice(0, 1)]);
    setDeckPlayer2Remaining(deckPlayer2.length);
    setWaitPlayer2(false);
    setStartBattlePlayer2(false);
    drawSound.play();
  };

  const onBattle = () => {
    battleSound.play();
    setBattle(true);
    setTimeout(() => {
      setBattle(false)
    }, 750);
  };
  
  const onRoundWinPlayer1 = () => {
    setTimeout(() => {
      setDisapearCardPlayer1(true);
      setDisapearCardPlayer2(true);
    }, 500);
    setTimeout(() => {
      if (deckPlayer1Remaining !== 0 || deckPlayer2Remaining !== 0) {
        setEndOfDeckPlayer1(false);
        setEndOfDeckPlayer2(false);
      };
      if (deckPlayer2Remaining === 0) {
        setGameOverPlayer2(true);
      };
      setRoundWinnerPlayer1(true);
      setDrawCardDeckPlayer1([]);
      setDrawCardDeckPlayer2([]);
    }, 750);
    setTimeout(() => {
      setFlipCardPlayer1(false);
      setFlipCardPlayer2(false);
    }, 800);
    setTimeout(() => {
      setRoundWinnerPlayer1(false);
    }, 1250);
  };

  const onRoundWinPlayer2 = () => {
    setTimeout(() => {
      setDisapearCardPlayer1(true);
      setDisapearCardPlayer2(true);
    }, 500);
    setTimeout(() => {
      if (deckPlayer2Remaining !== 0 || deckPlayer1Remaining !== 0) {
        setEndOfDeckPlayer1(false);
        setEndOfDeckPlayer2(false);
      };
      if (deckPlayer1Remaining === 0) {
        setGameOverPlayer1(true);
      };
      setRoundWinnerPlayer2(true);
      setDrawCardDeckPlayer1([]);
      setDrawCardDeckPlayer2([]);
    }, 750);
    setTimeout(() => {
      setFlipCardPlayer1(false);
      setFlipCardPlayer2(false);
    }, 800);
    setTimeout(() => {
      setRoundWinnerPlayer2(false);
    }, 1250);
  };

  if (waitPlayer1 && waitPlayer2) {
    setWaitPlayer1(false);
    setWaitPlayer2(false);
    if (deckOnGamePlayer1[0].value > deckOnGamePlayer2[0].value) {
      setIsBattlePlayer1(false);
      setIsBattlePlayer2(false);
      const cardsWinOnBattle = deckBattlePlayer1.concat(deckBattlePlayer2);
      const cardsWinOnBattleArray = [];
      cardsWinOnBattle.map((card) => {
        card.forEach((c) => cardsWinOnBattleArray.push(c));
      });
      setCardsWinOnBattleToShow(cardsWinOnBattleArray, deckOnGamePlayer1[0], deckOnGamePlayer2[0]);
      console.log('cardsWinOnBattleToShow', cardsWinOnBattleToShow);
      console.log('cardsWinOnBattleArray', cardsWinOnBattleArray);
      if (cardsWinOnBattle.length === 0) {
        setDeckPlayer1([...deckPlayer1, deckOnGamePlayer1[0], deckOnGamePlayer2[0]]);
      } else {
        const cardsWinBattleGoToDeck = cardsWinOnBattleArray.map((c) => c);
        setDeckPlayer1([...deckPlayer1, deckOnGamePlayer1[0], deckOnGamePlayer2[0], ...cardsWinBattleGoToDeck]);
      };
      setDeckBattlePlayer1([]);
      setDeckBattlePlayer2([]);
      setDeckOnGamePlayer1([]);
      setDeckOnGamePlayer2([]);
      onRoundWinPlayer1();
    } else if (deckOnGamePlayer1[0].value < deckOnGamePlayer2[0].value) {
      setIsBattlePlayer1(false);
      setIsBattlePlayer2(false);
      const cardsWinOnBattle = deckBattlePlayer1.concat(deckBattlePlayer2);
      const cardsWinOnBattleArray = [];
      cardsWinOnBattle.map((card) => {
        card.forEach((c) => cardsWinOnBattleArray.push(c));
      });
      setCardsWinOnBattleToShow(cardsWinOnBattleArray, deckOnGamePlayer1[0], deckOnGamePlayer2[0]);
      console.log('cardsWinOnBattleToShow', cardsWinOnBattleToShow);
      console.log('cardsWinOnBattleArray', cardsWinOnBattleArray);
      if (cardsWinOnBattle.length === 0) {
        setDeckPlayer2([...deckPlayer2, deckOnGamePlayer1[0], deckOnGamePlayer2[0]]);
      } else {
        const cardsWinBattleGoToDeck = cardsWinOnBattleArray.map((c) => c);
          setDeckPlayer2([...deckPlayer2, deckOnGamePlayer1[0], deckOnGamePlayer2[0], ...cardsWinBattleGoToDeck]);
      };
      setDeckBattlePlayer1([]);
      setDeckBattlePlayer2([]);
      setDeckOnGamePlayer1([]);
      setDeckOnGamePlayer2([]);
      onRoundWinPlayer2();
    }  else if (deckOnGamePlayer1[0].value === deckOnGamePlayer2[0].value) {
      if (deckPlayer1Remaining === 0) {
        setGameOverPlayer1(true);
      } else if (deckPlayer2Remaining === 0) {
        setGameOverPlayer2(true);
      } else {
        setTimeout(() => {
          setFlipCardPlayer1(false);
          setFlipCardPlayer2(false);
        }, 750);
        onBattle();
        setStartBattlePlayer1(true);
        setStartBattlePlayer2(true);
        console.log("battle");
      }
    }
    //console.log("deck battle P1 et P2", deckBattlePlayer1, deckBattlePlayer2);
  };
  
  const showRulesAgain = () => {
    setShowRules(!showRules)
  };

  const showHome = () => {
    setIsGameStarted(false);
    setDeckId();
    setDrawCardDeckPlayer1([]);
    setDrawCardDeckPlayer2([]);
    setShowRules(true);
    setDeckBattlePlayer1([]);
    setDeckBattlePlayer2([]);
    setIsBattlePlayer1(false);
    setIsBattlePlayer2(false);
    setGameOverPlayer1(false);
    setGameOverPlayer2(false);
  }

  //console.log("drawCardDeckPlayer1", drawCardDeckPlayer1);

  return (
    <div className="App">
      <div className={showRules ? "App-home" : "App-home-norules"}>
        <h1 className="App-home-header" onClick={showHome}>
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
            <button
              className="App-home-options-showrules-button"
              onClick={onBattle}
            >
              BATAILLE
            </button>
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
                On distribue les 52 cartes aux joueurs (la bataille se joue généralement à deux) qui les rassemblent face cachée en paquet devant eux.
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
                Le gagnant est celui qui remporte toutes les cartes du paquet.
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
                  <div className={endOfDeckPlayer1 ? "App-area-player1-game-deck-button-back-empty" : "App-area-player1-game-deck-button-back"}></div>
                  <button
                    className={flipCardPlayer1 ? "App-area-player1-game-deck-button-draw activeBackPlayer1" : (gameOverPlayer1 ? "App-area-player1-game-deck-button-back-over" : "App-area-player1-game-deck-button-draw")}
                    disabled={waitPlayer1 ? true : false}
                    onClick={startBattlePlayer1 ? drawBattleCardPlayer1 : drawCardPlayer1}
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
              <div className={isBattlePlayer1 ? "App-area-player1-game-deck-button-draw" : (flipCardPlayer1 ? "App-area-player1-game-play activeFrontPlayer1" : "App-area-player1-game-play")}>
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
          
            <div className="App-area-battle-show">
            {cardsWinOnBattleToShow.map((card) => (
              <img
                key={card.id}
                src={card.image}
                alt={card.id}
                className={disapearCardPlayer1 ? "App-area-player2-game-play-img-disapear" : "App-area-player2-game-play-img"}
              />
              ))}
            </div>
          
            
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
              <div className={isBattlePlayer2 ? "App-area-player2-game-deck-button-draw" : (flipCardPlayer2 ? "App-area-player2-game-play activeFrontPlayer2" : "App-area-player2-game-play")}>
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
                <div className={endOfDeckPlayer2 ? "App-area-player2-game-deck-button-back-empty" : "App-area-player2-game-deck-button-back"}></div>
                  <button
                    className={flipCardPlayer2 ? "App-area-player2-game-deck-button-draw activeBackPlayer2" : (gameOverPlayer2 ? "App-area-player2-game-deck-button-back-over" : "App-area-player2-game-deck-button-draw")}
                    disabled={waitPlayer2 ? true : false}
                    onClick={startBattlePlayer2 ? drawBattleCardPlayer2 : drawCardPlayer2}
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
