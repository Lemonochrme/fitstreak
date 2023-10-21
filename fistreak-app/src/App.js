import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Essayez de charger les données sauvegardées depuis le localStorage
    const savedProgress = localStorage.getItem('progress');
    const initialProgress = savedProgress ? JSON.parse(savedProgress) : this.getInitialProgress();
    this.state = {
      ...initialProgress,
      isTraining: false,
      manualInputTime: 0,
    };
  }

  getInitialProgress = () => {
    return {
      seriesDays: 0,
      workoutTime: 0,
      weeklyWorkoutTime: 0,
      lastUpdateDate: new Date().toDateString(),
    };
  };

  saveProgressToLocalStorage = () => {
    // Sauvegardez la progression actuelle dans le localStorage
    localStorage.setItem('progress', JSON.stringify(this.state));
  };

  startTraining = () => {
    if (!this.state.isTraining) {
      this.setState({ isTraining: true });
      this.trainingTimer = setInterval(this.incrementWorkoutTime, 1000);
    } else {
      this.stopTraining();
    }
  };

  stopTraining = () => {
    clearInterval(this.trainingTimer);
    const currentDate = new Date().toDateString();
    if (this.state.workoutTime >= 300) {
      if (currentDate === this.state.lastUpdateDate) {
        this.setState((prevState) => ({
          isTraining: false,
          seriesDays: prevState.seriesDays + 1,
          workoutTime: 0,
          weeklyWorkoutTime: prevState.weeklyWorkoutTime + prevState.workoutTime,
        }));
      } else {
        this.setState({
          isTraining: false,
          seriesDays: 1,
          workoutTime: 0,
          weeklyWorkoutTime: this.state.workoutTime, // Utilisez this.state au lieu de prevState
          lastUpdateDate: currentDate,
        });
      }
    } else {
      this.setState({ isTraining: false, workoutTime: 0 });
    }
    // Après la mise à jour de la progression, sauvegardez-la dans le localStorage
    this.saveProgressToLocalStorage();
  };
  
  manualInput = () => {
    const currentDate = new Date().toDateString();
    if (currentDate === this.state.lastUpdateDate) {
      this.setState((prevState) => ({
        seriesDays: prevState.seriesDays + 1,
        weeklyWorkoutTime: prevState.weeklyWorkoutTime + this.state.manualInputTime,
        manualInputTime: 0, // Réinitialise le champ de saisie
      }));
    } else {
      this.setState({
        seriesDays: 1,
        weeklyWorkoutTime: this.state.manualInputTime, // Utilisez this.state au lieu de prevState
        manualInputTime: 0,
        lastUpdateDate: currentDate,
      });
    }
    // Après la mise à jour de la progression, sauvegardez-la dans le localStorage
    this.saveProgressToLocalStorage();
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
                <span className="flame-icon">🔥</span>
                <span className="series-counter">{this.state.seriesDays} </span>
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