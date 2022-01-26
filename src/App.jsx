import { useState } from 'react';
import './App.scss';

function App() {
  const [deckId, setDeckId] = useState();
  const [drawCardDeckPlayer1, setDrawCardDeckPlayer1] = useState([]);
  const [drawCardDeckPlayer2, setDrawCardDeckPlayer2] = useState([]);
  const [listPlayer1, setListPlayer1] = useState();
  const [listPlayer2, setListPlayer2] = useState();
  const [waitPlayer1, setWaitPlayer1] = useState(false);
  const [waitPlayer2, setWaitPlayer2] = useState(false);
  const [startBattlePlayer1, setStartBattlePlayer1] = useState(false);
  const [startBattlePlayer2, setStartBattlePlayer2] = useState(false);
  const [isBattlePlayer1, setIsBattlePlayer1] = useState(false);
  const [isBattlePlayer2, setIsBattlePlayer2] = useState(false);
  const [deckBattlePlayer1, setDeckBattlePlayer1] = useState([]);
  const [deckBattlePlayer2, setDeckBattlePlayer2] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const pilePlayer1 = "pilePlayer1";
  const pilePlayer2 = "pilePlayer2";

  const startGame = async () => {
    setIsGameStarted(true);

    // Get a deck with 52 cards
    const res = await fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await res.json();
    setDeckId(data.deck_id);

    // FOR PLAYER 1
    // Draw 26 cards for player 1
    const res1 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=26`);
    const data1 = await res1.json();
  
    // Create a string with cards to create a pile for player 1
    const deckPlayer1 = data1.cards.map((c) => c.code).join(',');

    // Create a pile for player 1 and add 26 cards to the pile
    await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer1}/add/?cards=${deckPlayer1}`);

    // Create a list for player 1
    const res2 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer1}/list`);
      const data2 = await res2.json();
      setListPlayer1(data2.piles.pilePlayer1.remaining);

    // FOR PLAYER 2
    // Draw 26 cards for player 2
    const res3 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=26`);
    const data3 = await res3.json();

    // Create a string with cards to create a pile for player 2
    const deckPlayer2 = data3.cards.map((c) => c.code).join(',');

    // Create a pile for player 2 and add 26 cards to the pile
    await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer2}/add/?cards=${deckPlayer2}`);

    // Create a list for player 2
    const res4 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer2}/list`);
      const data4 = await res4.json();
      setListPlayer2(data4.piles.pilePlayer2.remaining);
  };
  
  // Draw a card from deck player 1
  const drawCardPlayer1 = () => {
    const fetchDataDrawCardPlayer1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/draw/bottom/?count=1`);
      const data = await res.json();
      setDrawCardDeckPlayer1(data.cards);
      setWaitPlayer1(true);
    }
    fetchDataDrawCardPlayer1();
    setIsBattlePlayer1(false);
  };

  // Draw a card from deck player 2
  const drawCardPlayer2 = () => {
    const fetchDataDrawCardPlayer2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/draw/bottom/?count=1`);
      const data = await res.json();
      setDrawCardDeckPlayer2(data.cards);
      setWaitPlayer2(true);
    }
    fetchDataDrawCardPlayer2();
    setIsBattlePlayer2(false);
  };

  // Draw a card from deck player 1 when battle
  const drawBattleCardPlayer1 = () => {
    setIsBattlePlayer1(true);
    const fetchDataDrawBattleCardPlayer1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/draw/bottom/?count=1`);
      const data = await res.json();
      setDeckBattlePlayer1([...deckBattlePlayer1, data.cards]);
      const res1 = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/list`);
      const data1 = await res1.json();
      setListPlayer1(data1.piles.pilePlayer1.remaining);
      setListPlayer2(data1.piles.pilePlayer2.remaining);
      console.log("Carte cachée P1", deckBattlePlayer1);
    }
    fetchDataDrawBattleCardPlayer1();
    setWaitPlayer1(false);
    setStartBattlePlayer1(false);
  };

  // Draw a card from deck player 2 when battle
  const drawBattleCardPlayer2 = () => {
    setIsBattlePlayer2(true);
    const fetchDataDrawBattleCardPlayer2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/draw/bottom/?count=1`);
      const data = await res.json();
      setDeckBattlePlayer2([...deckBattlePlayer2, data.cards]);
      const res1 = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/list`);
      const data1 = await res1.json();
      setListPlayer1(data1.piles.pilePlayer1.remaining);
      setListPlayer2(data1.piles.pilePlayer2.remaining);

      console.log("Carte cachée P2", deckBattlePlayer2);
    }
    fetchDataDrawBattleCardPlayer2();
    setWaitPlayer2(false);
    setStartBattlePlayer2(false);
  };

  
  if (waitPlayer1 && waitPlayer2) {
    setWaitPlayer1(false);
    setWaitPlayer2(false);
    if (listPlayer1 === 0) {
      alert('Player 2 a gagné !!!');
    }
    if (listPlayer2 === 0) {
      alert('Player 1 a gagné !!!');
    }
    if (drawCardDeckPlayer1[0].value === "ACE") {
      drawCardDeckPlayer1[0].value = "14";
    }
    if (drawCardDeckPlayer2[0].value === "ACE") {
      drawCardDeckPlayer2[0].value = "14";
    }
    if (drawCardDeckPlayer1[0].value === "KING") {
      drawCardDeckPlayer1[0].value = "13";
    }
    if (drawCardDeckPlayer2[0].value === "KING") {
      drawCardDeckPlayer2[0].value = "13";
    }
    if (drawCardDeckPlayer1[0].value === "QUEEN") {
      drawCardDeckPlayer1[0].value = "12";
    }
    if (drawCardDeckPlayer2[0].value === "QUEEN") {
      drawCardDeckPlayer2[0].value = "12";
    }
    if (drawCardDeckPlayer1[0].value === "JACK") {
      drawCardDeckPlayer1[0].value = "11";
    }
    if (drawCardDeckPlayer2[0].value === "JACK") {
      drawCardDeckPlayer2[0].value = "11";
    }
    if (Number(drawCardDeckPlayer1[0].value) > Number(drawCardDeckPlayer2[0].value)) {
      setIsBattlePlayer1(false);
      setIsBattlePlayer2(false);
      const cardsWinBattle = deckBattlePlayer1.concat(deckBattlePlayer2);
      console.log("concat", cardsWinBattle);
      const cardsWinBattleArray = [];
      cardsWinBattle.map((card) => {
        card.forEach((c) => cardsWinBattleArray.push(c));
      });
      console.log("cardsWinBattleArray", cardsWinBattleArray);
      const cardsWinBattleGoToDeck = cardsWinBattleArray.map((c) => c.code).join(',');
      const fetchDataReturnCardsToDeckPlayer1 = async () => {
        await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/add/?cards=${drawCardDeckPlayer1[0].code},${drawCardDeckPlayer2[0].code},${cardsWinBattleGoToDeck}`);
        const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/list`);
        const data = await res.json();
        setListPlayer1(data.piles.pilePlayer1.remaining);
        setListPlayer2(data.piles.pilePlayer2.remaining);
      }
      fetchDataReturnCardsToDeckPlayer1();
      setWaitPlayer1(false);
      setWaitPlayer2(false);
      setDeckBattlePlayer1([]);
      setDeckBattlePlayer2([]);
    } else if (Number(drawCardDeckPlayer1[0].value) < Number(drawCardDeckPlayer2[0].value)) {
      setIsBattlePlayer1(false);
      setIsBattlePlayer2(false);
      const cardsWinBattle = deckBattlePlayer1.concat(deckBattlePlayer2);
      console.log("concat", cardsWinBattle);
      const cardsWinBattleArray = [];
      cardsWinBattle.map((card) => {
        card.forEach((c) => cardsWinBattleArray.push(c));
      });
      console.log("cardsWinBattleArray", cardsWinBattleArray);
      const cardsWinBattleGoToDeck = cardsWinBattleArray.map((c) => c.code).join(',');
      const fetchDataReturnCardsToDeckPlayer2 = async () => {
        await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/add/?cards=${drawCardDeckPlayer1[0].code},${drawCardDeckPlayer2[0].code},${cardsWinBattleGoToDeck}`);
        const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/list`);
        const data = await res.json();
        setListPlayer1(data.piles.pilePlayer1.remaining);
        setListPlayer2(data.piles.pilePlayer2.remaining);
      }
      fetchDataReturnCardsToDeckPlayer2();
      setWaitPlayer1(false);
      setWaitPlayer2(false);
      setDeckBattlePlayer1([]);
      setDeckBattlePlayer2([]);
    }  else if (Number(drawCardDeckPlayer1[0].value) === Number(drawCardDeckPlayer2[0].value)) {
      setStartBattlePlayer1(true);
      setStartBattlePlayer2(true);
      
      setDeckBattlePlayer1([...deckBattlePlayer1, drawCardDeckPlayer1]);
      setDeckBattlePlayer2([...deckBattlePlayer2, drawCardDeckPlayer2]);

      console.log("battle");
    }
    console.log("deck battle P1 et P2", deckBattlePlayer1, deckBattlePlayer2);
  }
  return (
    <div className="App">
      {!isGameStarted && (
        <div className="App-home">
          <div className="App-home-rules">
            <h1 className="App-home-rules-header">
            La bataille, les règles du jeu
            </h1>
            <div className="App-home-rules-desc">
              On distribue les 52 cartes aux joueurs (la bataille se joue généralement à deux) qui les rassemblent face cachée en paquet devant eux.
              Chacun tire la carte du dessus de son paquet et la pose face visible sur la table.
              Celui qui a la carte la plus forte ramasse les autres cartes.
              L'as est la plus forte carte, puis roi, dame, valet, 10, etc.
              Lorsque deux joueurs posent en même temps deux cartes de même valeur il y a "bataille". Lorsqu'il y a "bataille" les joueurs tirent la carte suivante et la posent, face cachée, sur la carte précédente. Puis, ils tirent une deuxième carte qu'ils posent cette fois-ci face découverte et c'est cette dernière qui départagera les joueurs. Celui qui la valeur la plus forte, l'importe.
              Le gagnant est celui qui remporte toutes les cartes du paquet.
            </div>
          </div>
          <button onClick={startGame} className="App-home-button">Jouer</button>
        </div>
      )}
      {isGameStarted && (
        <div className="App-area">
        <div className="App-area-player1">
          <div className="App-area-player1-name">Player 1</div>
          <div className="App-area-player1-game">
            <div className="App-area-player1-game-deck">
              <div className="App-area-player1-game-deck-button">
                <button
                    className="App-area-player1-game-deck-button-draw"
                    disabled={waitPlayer1 ? true : false}
                    onClick={startBattlePlayer1 ? drawBattleCardPlayer1 : drawCardPlayer1}
                    aria-label="start-game"
                >
                </button>
              </div>
              {deckId && (
                <div className="App-area-player1-game-deck-count">
                  Cartes restantes : <em>{listPlayer1}</em>
                </div>
              )}
            </div>
            <div className={isBattlePlayer1 ? "App-area-player1-game-deck-button-draw" : "App-area-player1-game-play"}>
              {drawCardDeckPlayer1.map((c) => (
                <img
                  key={c.code}
                  src={c.image}
                  alt={c.code}
                  className={isBattlePlayer1 ? "hidden" : "App-area-player1-game-play-img"}
                />
              ))}
            </div>
          </div>
          
        </div>
        <div className="App-area-player2">
          <div className={isBattlePlayer2 ? "App-area-player2-deck-draw" : "App-area-player2-play"}>
            {drawCardDeckPlayer2.map((c) => (
              <img
                key={c.code}
                src={c.image}
                alt={c.code}
                className={isBattlePlayer2 ? "hidden" : "App-area-player1-play-img"}
              />
            ))}
            </div>
          <div className="App-area-player2-deck">
            <div className="App-area-player2-deck-name">Player 2</div>
            <button
              className="App-area-player2-deck-draw"
              disabled={waitPlayer2 ? true : false}
              onClick={startBattlePlayer2 ? drawBattleCardPlayer2 : drawCardPlayer2}
              aria-label="start-game"
            >
            </button>
            {deckId && (
              <div className="App-area-player2-deck-count">
                Cartes restantes : <em>{listPlayer2}</em>
            </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default App
