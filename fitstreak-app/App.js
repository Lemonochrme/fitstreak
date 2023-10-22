import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput, Provider, Title } from 'react-native-paper';

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

  const motivationalQuotes = [
    "La persévérance est la clé du succès.",
    "Le secret du succès est de commencer.",
    "Le succès n'est pas la clé du bonheur, le bonheur est la clé du succès.",
    "La difficulté est l'excuse de l'histoire.",
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  return (
    <Provider>
      <View style={styles.mainContainer}>
        <Text style={styles.greetingText}>Bonjour Robin!</Text>
        <View style={styles.seriesContainer}>
          {series === 0 ? (
            <View style={styles.seriesTextContainer}>
              <Title style={styles.flameZeroText}>🔥</Title>
              <Text style={styles.seriesZeroText}>Il est temps de s'y mettre cowboy</Text>
            </View>
          ) : (
            <Text style={styles.seriesText}>Série: {series}</Text>
          )}
        </View>
        <View style={styles.motivationalQuoteContainer}>
          <Text style={styles.motivationalQuote}>{getRandomQuote()}</Text>
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
          textColor='#ffff'
          buttonColor='#F9AF5E'
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#2E3643',
    padding: '8%',
  },
  greetingText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seriesContainer: {
    backgroundColor: '#465163',
    padding: 10,
    borderRadius: 16,
    width: '100%',
    height: '20%',
    marginBottom: 20,
  },
  seriesTextContainer: {
    padding: 10,
    borderRadius: 16,
    display: 'flex',
  },
  seriesZeroText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,

  },
  flameZeroText: {
    fontSize: 60,
  },
  seriesText: {
    color: 'white',
    fontSize: 24,
  },
  motivationalQuoteContainer: {
    padding: 10,
    borderRadius: 16,
    marginBottom: 20,
  },
  motivationalQuote: {
    color: '#5F6E84',
    fontSize: 18,
    textAlign: 'center',
  },
  timerContainer: {
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
  },
});

export default App;
