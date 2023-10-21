import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput, Provider } from 'react-native-paper';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [series, setSeries] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [visible, setVisible] = useState(false);
  const [weekTotal, setWeekTotal] = useState(0);
  const [lastSeriesDate, setLastSeriesDate] = useState(null);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      const currentTime = time;
      setWeekTotal(weekTotal + currentTime);
      if (!lastSeriesDate || new Date().toDateString() !== lastSeriesDate) {
        // C'est un nouveau jour, incrémentez la série
        setLastSeriesDate(new Date().toDateString());
        if (currentTime >= 300) {
          setSeries(series + 1);
        }
      }
      // Réinitialiser le temps
      setTime(0);
    } else {
      setIsRunning(true);
    }
  };

  const handleLongPress = () => {
    setVisible(true);
  };

  const handleInputTime = () => {
    if (inputTime) {
      const enteredTime = parseInt(inputTime, 10);
      if (enteredTime >= 300) {
        setTime(time + enteredTime);
        setWeekTotal(weekTotal + enteredTime);
        if (!lastSeriesDate || new Date().toDateString() !== lastSeriesDate) {
          // C'est un nouveau jour, incrémentez la série
          setLastSeriesDate(new Date().toDateString());
          setSeries(series + 1);
        }
      }
      setInputTime('');
      setVisible(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.seriesContainer}>
          {series === 0 ? (
            <View style={styles.seriesTextContainer}>
              <Text style={styles.seriesZeroText}>Nombre de jours</Text>
            </View>
          ) : (
            <Text style={styles.seriesText}>Série: {series}</Text>
          )}
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
        <View style={styles.weekStats}>
          <Text style={styles.statsText}>Statistiques</Text>
          <Text style={styles.statsText}>{formatTime(weekTotal)}</Text>
        </View>
        <Button
          mode="contained"
          buttonColor="#F9AF5E"
          textColor="#FFFF"
          onPress={startStopTimer}
          onLongPress={handleLongPress}
          style={styles.startButton}
        >
          {isRunning ? 'Arrêter' : 'Démarrer'}
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Entrée Manuelle</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Durée (en secondes)"
                value={inputTime}
                onChangeText={(text) => setInputTime(text)}
                keyboardType="numeric"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleInputTime}>Ajouter</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3643',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesContainer: {
    backgroundColor: '#465163',
    padding: 10,
    paddingHorizontal: 20, // Ajout du padding horizontal
    borderRadius: 8,
    marginBottom: 20,
    width: 200, // Largeur constante
  },
  seriesTextContainer: {
    backgroundColor: '#465163',
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  seriesZeroText: {
    color: 'white',
    fontSize: 24,
  },
  seriesText: {
    color: 'white',
    fontSize: 24,
  },
  timerContainer: {
    backgroundColor: '#465163',
    padding: 20,
    borderRadius: 8,
  },
  timerText: {
    color: 'white',
    fontSize: 36,
  },
  weekStats: {
    marginTop: 20,
    alignItems: 'center',
  },
  statsText: {
    color: 'white',
    fontSize: 24,
  },
  startButton: {
    marginTop: 10,
    width: 200,
  },
});

export default App;
