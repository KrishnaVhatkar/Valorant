import React, { Component } from "react";
import './App.css';

class ValorantGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [
        {
          name: "Jett",
          role: "Duelist",
          abilities: ["Cloudburst", "Updraft", "Blade Storm"],
        },
        {
          name: "Phoenix",
          role: "Duelist",
          abilities: ["Curveball", "Fireball", "Run It Back"],
        },
        {
          name: "Sova",
          role: "Initiator",
          abilities: ["Owl Drone", "Shock Bolt", "Hunter's Fury"],
        },
        {
          name: "Brimstone",
          role: "Controller",
          abilities: ["Incendiary", "Stim Beacon", "Orbital Strike"],
        },
        // Add more characters here...
      ],
      score: 0,
      currentCharacter: null,
      options: [],
      userChoice: null,
    };
  }

  componentDidMount() {
    this.newRound();
  }

  newRound = () => {
    const { characters } = this.state;
    const correctCharacter = this.getRandomCharacter();
    const options = this.getRandomOptions(correctCharacter);

    this.setState({
      currentCharacter: correctCharacter,
      options: options,
      userChoice: null,
    });
  };

  getRandomCharacter = () => {
    const { characters } = this.state;
    return characters[Math.floor(Math.random() * characters.length)];
  };

  getRandomOptions = (correctCharacter) => {
    const { characters } = this.state;
    const options = [correctCharacter];

    while (options.length < 4) {
      const randomCharacter = this.getRandomCharacter();
      if (!options.includes(randomCharacter)) {
        options.push(randomCharacter);
      }
    }

    return this.shuffleArray(options);
  };

  shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  handleChoice = (index) => {
    const { currentCharacter, options } = this.state;
    if (options[index] === currentCharacter) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    } else {
      this.setState((prevState) => ({
        score: prevState.score - 1,
      }));
    }
    this.newRound();
  };

  render() {
    const { currentCharacter, options, score } = this.state;

    return (
      <div className="container">
        <h1>Valorant Character Guessing Game</h1>
        {currentCharacter && (
          <div>
            <h2>Guess the character based on their role and abilities:</h2>
            <h3>Role: {currentCharacter.role}</h3>
            <h3>Abilities:</h3>
            <ul>
              {currentCharacter.abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h2>Options:</h2>
          {options.map((character, index) => (
            <button key={index} onClick={() => this.handleChoice(index)}>
              {character.name}
            </button>
          ))}
        </div>
        <h2>Score: {score}</h2>
      </div>
    );
  }
}

export default ValorantGame;
