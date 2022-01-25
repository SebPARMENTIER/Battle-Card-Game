import { useState } from 'react';
import './App.scss';

function App() {
  const [deckId, setDeckId] = useState();
  const [drawCardDeckPlayer1, setDrawCardDeckPlayer1] = useState([]);
  const [drawCardDeckPlayer2, setDrawCardDeckPlayer2] = useState([]);

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

    // Create a list for player 1
    const res2 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer1}/list`);
    const data2 = await res2.json();
    
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
  };
  
  // Draw a card from deck player 1
  const drawCardPlayer1 = () => {
    const fetchDataDrawCardPlayer1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/draw/?count=1`);
      const data = await res.json();
      setDrawCardDeckPlayer1(data.cards);
      
      const res1 = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/list`);
      const data1 = await res1.json();

      console.log('data1', data1);
    }
    fetchDataDrawCardPlayer1();
  };

  // Draw a card from deck player 2
  const drawCardPlayer2 = () => {
    const fetchDataDrawCardPlayer2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/draw/?count=1`);
      const data = await res.json();
      setDrawCardDeckPlayer2(data.cards);

      const res2 = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/list`);
      const data2 = await res2.json();

      console.log('data2', data2);
    }
    fetchDataDrawCardPlayer2();
  };

  return (
    <div className="App">
      <button onClick={startGame} className="App-button">Jouer</button>
      <div className="App-area">
        <div className="App-area-player1">
          <div className="App-area-player1-deck">
            <button
              className="App-area-player1-deck-draw"
              onClick={drawCardPlayer1}
              aria-label="start-game"
            >
            </button>
          </div>
          <div className="App-area-player1-play">
            {drawCardDeckPlayer1.map((c) => (
              <img
                key={c.code}
                src={c.image}
                alt={c.code}
                className="App-area-player1-play-img"
              />
            ))}
          </div>
        </div>
        <div className="App-area-player2">
          <div className="App-area-player2-play">
            {drawCardDeckPlayer2.map((c) => (
              <img
                key={c.code}
                src={c.image}
                alt={c.code}
                className="App-area-player2-play-img"
              />
            ))}
            </div>
          <div className="App-area-player2-deck">
            <button
              className="App-area-player2-deck-draw"
              onClick={drawCardPlayer2}
              aria-label="start-game"
            >
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App