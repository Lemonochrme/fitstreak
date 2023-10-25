import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
    <Text style={TextStyles.h2}>
      Rien à voir ici. Démarre un entraînement pour commencer.
    </Text>
  );
}

const Colors = {
  ORANGE: '#F9AF5E',
  DIMMED_ORANGE: '#85613A',
  RED: '#D56B5D',
  GREEN: '7BC767',
  BACKGROUND: '#1C1C1C',
  CONTRASTED_BACKGROUND: '#393939',
  TEXT: '#FFFFFF',
  DIMMED_TEXT: '#7E7E7E',
}

const App = ({ navigation }) => {
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
        <MainButton onPress={() => navigation.navigate('ChronometerScreen')} />
      </View>

    </View>
  );
};

const ChronometerScreen = () => {
  return (
    <View style={styles.MainContainer}>
      <Text style={TextStyles.h1}>Second Screen</Text>
      {/* Add content for the second screen here */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Containers
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    justifyContent: 'center',
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
    backgroundColor: Colors.CONTRASTED_BACKGROUND,
    borderRadius: 20,
  },
  CardStreak: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.CONTRASTED_BACKGROUND,
    borderRadius: 20,
  },
  MainButton: {
    backgroundColor: Colors.ORANGE,
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

const TextStyles = StyleSheet.create({
  h1: {
    color: Colors.TEXT,
    fontWeight: 'bold',
    fontSize: 30,
  },
  h2: {
    color: Colors.TEXT,
    fontSize: 20,
    fontWeight: 'bold',
  },
  h3: {
    color: Colors.TEXT,
  },
});

const Stack = createStackNavigator();

const FitstreakDarkTheme = { // Fix white screen during screen navigation transition.
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.BACKGROUND,
  },
};

export default function MainApp() {
  return (
    <NavigationContainer theme={FitstreakDarkTheme}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BACKGROUND} />
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="ChronometerScreen" component={ChronometerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
