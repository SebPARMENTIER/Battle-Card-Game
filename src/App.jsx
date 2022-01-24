import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [deckId, setDeckId] = useState();
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);

  const [deck_id, setDeck_id] = useState();
  const pilePlayer10 = "pilePlayer10";

  const startGame = async () => {
    
      const res = await fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await res.json();
      setDeck_id(data.deck_id);

      console.log("deckId", deck_id);

      const res1 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=26`);
      const data1 = await res1.json();
   
      const deckPlayer10 = data1.cards.map((c) => c.code).join(',');

      

      await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer10}/add/?cards=${deckPlayer10}`);

      const res3 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer10}/list`);
      const data3 = await res3.json();

      console.log('data3', data3);
  }

  

  const getDeck = () => {
    const fetchData = async () => {
      const res = await fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await res.json();
      setDeckId(data.deck_id);
    }
    fetchData();
  };

  console.log(deckId);

  const [deckPlayer1, setDeckPlayer1] = useState([]);
  const [deckPlayer2, setDeckPlayer2] = useState([]);

  const drawCardsPlayer1 = () => {
    const fetchDataCardsPlayer1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`);
      const data = await res.json();
      setDeckPlayer1(data.cards)
      
    }
    fetchDataCardsPlayer1();
  };

  console.log("cards player 1", deckPlayer1);

  const drawCardsPlayer2 = () => {
    const fetchDataCardsPlayer2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`);
      const data = await res.json();
      setDeckPlayer2(data.cards)
      
    }
    fetchDataCardsPlayer2();
  };

  console.log("cards player 2", deckPlayer2);

  const pilePlayer1 = "pilePlayer1";
  
  const deckPlayer1Array = [];  

  deckPlayer1.map((d) => {
      deckPlayer1Array.push(d.code);
    });

  const pilePlayer1Data = () => {
    
    const fetchDataPilePlayer1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/add/?cards=${deckPlayer1Array.join(',')}`);
      const data = await res.json();
      setCards1(data.piles);
    }
    fetchDataPilePlayer1();
  };
  
  const [list1, setList1] = useState();

  const listPlayer1 = () => {
    const fetchDataList1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer1}/list`);
      const data = await res.json();
      setList1(data);
    }
    fetchDataList1();
  };

  const pilePlayer2 = "pilePlayer2";
  
  const deckPlayer2Array = [];  

  deckPlayer2.map((d) => {
      deckPlayer2Array.push(d.code);
    });

  const pilePlayer2Data = () => {
    
    const fetchDataPilePlayer2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/add/?cards=${deckPlayer2Array.join(',')}`);
      const data = await res.json();
      setCards2(data.piles);
    }
    fetchDataPilePlayer2();
  };
  
  const [list2, setList2] = useState();

  const listPlayer2 = () => {
    const fetchDataList2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/list`);
      const data = await res.json();
      setList2(data);
    }
    fetchDataList2();
  };

  console.log("liste 1", list1);

  console.log("deck 1", deckPlayer1Array);

  console.log("pile 1", cards1);

  console.log("liste 2", list2);

  console.log("deck 2", deckPlayer2Array);

  console.log("pile 2", cards2);


  const [cardPlayer1, setCardPlayer1] = useState([]);

  const drawCardPlayer1 = () => {
    const fetchDataDrawCardPlayer1 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/pile/${pilePlayer10}/draw/?count=1`);
      const data = await res.json();
      setCardPlayer1(data.cards);
      const res4 = await fetch(`http://deckofcardsapi.com/api/deck/${data.deck_id}/pile/${pilePlayer10}/list`);
      const data4 = await res4.json();

      console.log('data4', data4);
    }
    fetchDataDrawCardPlayer1();
  };

  const [cardPlayer2, setCardPlayer2] = useState([]);

  const drawCardPlayer2 = () => {
    const fetchDataDrawCardPlayer2 = async () => {
      const res = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/pile/${pilePlayer2}/draw/?count=1`);
      const data = await res.json();
      setCardPlayer2(data.cards);
    }
    fetchDataDrawCardPlayer2();
  };

  return (
    <div className="App">
      <button onClick={startGame} className="App-button">Jouer</button>
      <button onClick={drawCardsPlayer1} className="App-button">Play1</button>
      <button onClick={drawCardsPlayer2} className="App-button">Play2</button>
      <button onClick={pilePlayer1Data} className="App-button">Pile1</button>
      <button onClick={listPlayer1} className="App-button">Liste1</button>
      <button onClick={pilePlayer2Data} className="App-button">Pile2</button>
      <button onClick={listPlayer2} className="App-button">Liste2</button>
      <div className="App-area">
        <div className="App-area-player1">
          <div className="App-area-player1-deck">
            <button
              className="App-area-player1-deck-draw"
              onClick={drawCardPlayer1}></button>
          </div>
          <div className="App-area-player1-play">
            {cardPlayer1.map((c) => (            
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
            {cardPlayer2.map((c) => (
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
            ></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App