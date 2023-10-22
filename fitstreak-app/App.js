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
        if (currentTime >= 1) {
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
        
        <view style={styles.contentContainer}>

          <View style={styles.seriesContainer}>
            {series === 0 ? (
              <View style={styles.seriesTextContainer}>
                <Title style={styles.flameZeroText}>🔥</Title>
                <Text style={styles.seriesZeroText}>Il est temps de s'y mettre cowboy</Text>
              </View>
            ) : (
              <Text style={styles.seriesText}>Tu es dans une série de {series} jours d’affilé !</Text>
            )}
          </View>
          <View style={styles.motivationalQuoteContainer}>
            <Text style={styles.motivationalQuote}>{getRandomQuote()}</Text>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
          </View>
          <View style={styles.weekStats}>
            <View style={styles.weekStats}>
            {series === 0 ? (
              <Text style={styles.statsText}>Démarrez un entrainement pour commencer une série.</Text>
            ) : (
              <Text style={styles.statsText}>Vous vous êtes entraîné {formatTime(weekTotal)} cette semaine</Text>
            )}
          </View>
          </View>
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
        </view>

        <view styles={styles.startButtonContainer}>
          <Button
              mode="contained"
              textColor='#ffff'
              buttonColor={isRunning ? '#D56B5D' : '#F9AF5E'}
              onPress={startStopTimer}
              onLongPress={handleLongPress}
              style={styles.startButton}
            >
              {isRunning ? 'Arrêter' : 'Démarrer'}
            </Button>
        </view>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: '8%',
  },
  contentContainer: { 
    height: '100%',
    flex: 1,  // Set contentContainer to flex 1 to make it take up the entire available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  greetingText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seriesContainer: {
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 16,
    width: '100%',
    height: '24%',
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
    fontWeight: 'bold',
    fontSize: 24,
  },
  motivationalQuoteContainer: {
    padding: 10,
    borderRadius: 16,
    marginBottom: 20,
    height: 100,
  },
  motivationalQuote: {
    color: '#5F6E84',
    fontSize: 18,
    textAlign: 'center',
  },
  timerContainer: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startButtonContainer: {
    padding: '100px',
  },
  startButton: {
  },
});

export default App;
