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
  const [isBattle, setIsBattle] = useState(false);


  const pilePlayer1 = "pilePlayer1";
  const pilePlayer2 = "pilePlayer2";

  const startGame = async () => {
    
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

    // FOR PLAYER 2
    // Draw 26 cards for player 2
    const res2 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=26`);
    const data2 = await res2.json();

    // Create a string with cards to create a pile for player 2
    const deckPlayer2 = data2.cards.map((c) => c.code).join(',');

    // Create a pile for player 2 and add 26 cards to the pile
    await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer2}/add/?cards=${deckPlayer2}`);
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
  };
  
  if (waitPlayer1 && waitPlayer2) {
    setWaitPlayer1(false);
    setWaitPlayer2(false);
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
      const fetchDataReturnCardsToDeckPlayer1 = async () => {
        await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/add/?cards=${drawCardDeckPlayer1[0].code},${drawCardDeckPlayer2[0].code}`);
        const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/list`);
        const data = await res.json();
        setListPlayer1(data.piles.pilePlayer1.remaining);
        setListPlayer2(data.piles.pilePlayer2.remaining);
      }
      fetchDataReturnCardsToDeckPlayer1();
      setWaitPlayer1(false);
      setWaitPlayer2(false);
    } else if (Number(drawCardDeckPlayer1[0].value) < Number(drawCardDeckPlayer2[0].value)) {
      const fetchDataReturnCardsToDeckPlayer2 = async () => {
        await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/add/?cards=${drawCardDeckPlayer1[0].code},${drawCardDeckPlayer2[0].code}`);
        const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/list`);
        const data = await res.json();
        setListPlayer1(data.piles.pilePlayer1.remaining);
        setListPlayer2(data.piles.pilePlayer2.remaining);
      }
      fetchDataReturnCardsToDeckPlayer2();
      setWaitPlayer1(false);
      setWaitPlayer2(false);
    }
  }

  return (
    <div className="App">
      <button onClick={startGame} className="App-button">Jouer</button>
      <div className="App-area">
        <div className="App-area-player1">
          <div className="App-area-player1-deck">
            <button
              className="App-area-player1-deck-draw"
              disabled={waitPlayer1 ? true : false}
              onClick={drawCardPlayer1}
              aria-label="start-game"
            >
            </button>
            {deckId && (
              <div className="App-area-player1-deck-count">
              {listPlayer1}
            </div>
            )}
          </div>
          <div className={isBattle ? "App-area-player1-deck-draw" : "App-area-player1-play"}>
            {drawCardDeckPlayer1.map((c) => (
              <img
                key={c.code}
                src={c.image}
                alt={c.code}
                className={isBattle ? "hidden" : "App-area-player1-play-img"}
              />
            ))}
          </div>
        </div>
        <div className="App-area-player2">
          <div className={isBattle ? "App-area-player2-deck-draw" : "App-area-player2-play"}>
            {drawCardDeckPlayer2.map((c) => (
              <img
                key={c.code}
                src={c.image}
                alt={c.code}
                className={isBattle ? "hidden" : "App-area-player1-play-img"}
              />
            ))}
            </div>
          <div className="App-area-player2-deck">
            <button
              className="App-area-player2-deck-draw"
              disabled={waitPlayer2 ? true : false}
              onClick={drawCardPlayer2}
              aria-label="start-game"
            >
            </button>
            {deckId && (
              <div className="App-area-player2-deck-count">
              {listPlayer2}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App