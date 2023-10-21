import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesDays: 0,
      workoutTime: 0,
      isTraining: false,
      weeklyWorkoutTime: 0,
      manualInputTime: 0,
    };
  }

  startTraining = () => {
    if (!this.state.isTraining) {
      this.setState({ isTraining: true, trainingTimeElapsed: 0 });
      this.trainingTimer = setInterval(this.incrementWorkoutTime, 1000);
    } else {
      this.stopTraining();
    }
  };

  stopTraining = () => {
    clearInterval(this.trainingTimer);
    if (this.state.workoutTime >= 300) { // 5 minutes
      this.setState((prevState) => ({
        isTraining: false,
        seriesDays: prevState.seriesDays + 1,
        workoutTime: 0,
        weeklyWorkoutTime: prevState.weeklyWorkoutTime + prevState.workoutTime,
      }));
    } else {
      this.setState({ isTraining: false, workoutTime: 0 });
    }
  };

  incrementWorkoutTime = () => {
    this.setState((prevState) => ({
      workoutTime: prevState.workoutTime + 1,
      trainingTimeElapsed: prevState.trainingTimeElapsed + 1,
    }));
  };

  manualInput = () => {
    this.setState((prevState) => ({
      seriesDays: prevState.seriesDays + 1,
      weeklyWorkoutTime: prevState.weeklyWorkoutTime + this.state.manualInputTime,
      manualInputTime: 0, // Réinitialise le champ de saisie
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo">Fitstreak</div>
        </header>
        <div className="series-container">
          {this.state.seriesDays === 0 ? (
            <>
              <div className="no-series-message">
                Entraînez-vous pour commencer votre série!
              </div>
            </>
          ) : (
            <>
              <div className="series-content">
                <i className="flame-icon"></i>
                <span>{this.state.seriesDays} </span>
                <span>jours d'affilé !</span>
              </div>
            </>
          )}
        </div>
        {this.state.isTraining && (
          <div className="training-counter">
            <p>Temps écoulé: {this.state.trainingTimeElapsed} secondes</p>
          </div>
        )}
        <div className="statistics">
          <div className="weekly-stat">
            <p>Statistiques</p>
            <p>{this.state.weeklyWorkoutTime} minutes</p>
          </div>
        </div>
        <div className="manual-input">
            <input
              type="number"
              placeholder="Entrez le temps d'entraînement (en minutes)"
              value={this.state.manualInputTime}
              onChange={(e) =>
                this.setState({ manualInputTime: parseInt(e.target.value, 10) })
              }
            />
            <button onClick={this.manualInput}>Ajouter Manuellement</button>
        </div>          

        <div className="action-button">
          <button onClick={this.startTraining}>
            {this.state.isTraining ? 'Arrêter' : 'Démarrer'}
          </button>
        </div>
      </div>
    );
  }
}

export default App;