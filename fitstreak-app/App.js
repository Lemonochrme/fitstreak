import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';

const StreakCard = ({ isStreak }) => {
  if (isStreak) {
    return <View style={styles.CardStreak}></View>;
  } else {
    return <View style={styles.CardNoStreak}></View>;
  }
};

const MainButton = ({ onPress, onLongPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.MainButton}>
      <Text style={TextStyles.h2}>Démarrer</Text>
    </TouchableOpacity>
  );
};

const BasicTextContent = () => {
  return (
    <Text style={TextStyles.h2} color='red'>
      Rien à voir ici. Démarre un entrainement pour commencer.
    </Text>
  );
}

const App = () => {
  const [isStreak, setIsStreak] = useState(false);

  const handleStartWorkout = () => {
    setIsStreak(true);
  }

  return (
    <View style={styles.MainContainer}>
      
      <View style={styles.Header}>
        <Text style={TextStyles.h1}>Bienvenue !</Text>
        <StreakCard isStreak={isStreak} />
      </View>

      <View style={styles.ContentContainer}>
        <BasicTextContent />
      </View>

      <View style={styles.Footer}>
        <MainButton onPress={handleStartWorkout} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  // Containers
  MainContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    paddingHorizontal: 20, // Marge sur les côtés
    justifyContent: 'flex-start',
  },
  Header: {
    marginTop: 50,
    width: '100%',
    flex: 2,
  },
  ContentContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
  },
  Footer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  // Cards
  CardNoStreak: {
    flex: 1,
    width: '100%',
    backgroundColor: '#393939',
    borderRadius: 20,
  },
  CardStreak: {
    flex: 1,
    width: '100%',
    backgroundColor: '393939',
    borderRadius: 20,
  },
  MainButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 100,
    paddingVertical: 10, 
    borderRadius: 10, 
  },
});

const TextStyles = StyleSheet.create({
  h1: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  h2: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  h3: {
    color: '#ffff',
  },
});

export default App;
