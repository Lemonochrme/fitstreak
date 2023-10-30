import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Button, TextInput, Vibration, Image } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';

/* ------------------- Logic ------------------- */

const StreakCard = ({ isStreak }) => {
  if (isStreak) {
    return (
      <View style={styles.CardStreak}>
        
      </View>
    );
  } else {
    return (
      <View style={styles.CardNoStreak}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1}}>
          <View style={{ flex: 5 }}>
            <Text style={TextStyles.h2}>IMG</Text>
          </View>
          <View style={{ flex: 10, backgroundColor: Colors.ORANGE }}>
            <Text style={TextStyles.h2}>Il est temps de s'y mettre cowboy.</Text>
            <Text style={TextStyles.h3}>Entraine toi deux jours consécutifs pour démarrer une série !</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', padding: 16 }}> 
          <View style={styles.WeekStreakContainer}>
            <View style={styles.WeekDay}></View>
            <View style={styles.WeekDay}></View>
            <View style={styles.WeekDay}></View>
            <View style={styles.WeekDay}></View>
            <View style={styles.WeekDay}></View>
            <View style={styles.WeekDay}></View>
            <View style={styles.WeekDay}></View>
          </View>
        </View>

      </View>
    );
  }
};

const MainButton = ({ onPress, onLongPress, title, color }) => {
  const dynamicStyles = {
    backgroundColor: color || Colors.ORANGE, // Default color : Orange
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.MainButton, dynamicStyles]}
    >
      <Text style={TextStyles.h2}>{title}</Text>
    </TouchableOpacity>
  );
};

const BasicTextContent = ({ WeekTrainingTime }) => {

  if (WeekTrainingTime == 0) {
  return (
    <Text style={TextStyles.h2}>
      Rien à voir ici. Démarre un entraînement pour commencer.
    </Text>
  );
  } else {
    return (
      <Text style={TextStyles.h2}>
        Vous vous être entrainé { WeekTrainingTime } cette semaine.
      </Text>
    );

  }
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


/* ------------------- Miscellaneous ------------------- */

function handleOnpress() {
  Vibration.vibrate(50);
}

function handleLongPress() {
  Vibration.vibrate(70);
}

/* ------------------- Screen ------------------- */

const App = ({ navigation }) => {
  const [isStreak, setIsStreak] = useState(false);
  const [WeekTrainingTime, setWeekTrainingTime] = useState(0);

  const name = "Robin";

  return (
    <View style={styles.MainContainer}>

      <View style={styles.Header}>
        <View style={ {paddingBottom: 10 } }>
          <Text style={TextStyles.h1}>Bonjour {name} !</Text>
        </View>
        <StreakCard isStreak={isStreak} />
      </View>

      <View style={styles.ContentContainer}>
        <BasicTextContent WeekTrainingTime={WeekTrainingTime} />
      </View>

      <View style={styles.Footer}>
        <MainButton onPress={() => { // On utilise => pour appeler les 2 handles
          navigation.navigate('ChronometerScreen');
          handleOnpress();
        }}
        onLongPress={() => {
          navigation.navigate('ManualTimeEntryScreen');
          handleLongPress();
        }}
        title="Démarrer"
        />
      </View>

    </View>
  );
};

const ChronometerScreen = () => {
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [TempSessionTrainingTime, setTempSessionTrainingTime] = useState(0);

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running]);

  const toggleRunning = () => {
    setRunning((prevState) => !prevState);
  };

  const resetTimer = () => {
    setRunning(false);
    setElapsedTime(0);
  };

  const formattedTime = moment.utc(elapsedTime).format('HH:mm:ss');

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ContentContainer}>
        <Text style={{ fontSize: 32, color: 'white' }}>{formattedTime}</Text>
      </View>

      <View style={styles.Footer}>
        <MainButton title={running ? 'Stop' : 'Start'} onPress={() => {toggleRunning(); handleOnpress(); }} onLongPress={() => { resetTimer(); handleLongPress(); }} color={running ? '#D56B5D' : '#7BC767'}/>    
      </View>

    </View>
  );
};

const ManualTimeEntryScreen =() => {
  const [texteSaisi, setTexteSaisi] = useState('');

  // Cette fonction sera appelée lorsque le texte sera saisi
  const handleTextChange = (text) => {
    setTexteSaisi(text);
  };

  // Cette fonction sera appelée lorsque le bouton sera appuyé
  const handleSubmit = () => {
    console.log('Texte saisi :', texteSaisi);
  };

  return (
    <View style={styles.MainContainer}>
      <View styles={styles.Header}>
        
      </View>
      
      <View styles={styles.ContentContainer}>
        <Text>Saisissez du texte :</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: Colors.CONTRASTED_BACKGROUND,
            borderRadius: 16,
            width: 200,
            height: 40,
            paddingLeft: 10,
            margin: 10,
          }}
          keyboardType="numeric"
          onChangeText={handleTextChange} // Appelé à chaque modification du texte
          value={texteSaisi} // La valeur du champ de texte est liée à l'état
          placeholder="Entrez du texte ici"
        />
      </View>
      
      <View style={styles.Footer}> 
        <MainButton title="Valider" onPress={() => {handleSubmit(); handleOnpress(); }} color={'#7BC767'} />
      </View>
    </View>
  );
};


/* ------------------- Styles ------------------- */

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
    marginTop: 20,
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
    backgroundColor: Colors.CONTRASTED_BACKGROUND,
    borderRadius: 20,
  },
  CardStreak: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.CONTRASTED_BACKGROUND,
    borderRadius: 20,
  },
  WeekStreakContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.DIMMED_TEXT,
    borderRadius: 100,
    width: 325,
  },
  WeekDay: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    marginHorizontal: 17,
    marginVertical: 4,
    borderRadius: 100,
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

/* ------------------- Navigation ------------------- */

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
      <Stack.Navigator initialRouteName="App" screenOptions={{ headerStyle: { backgroundColor: '#1C1C1C' } }}>
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="ChronometerScreen" component={ChronometerScreen} options={{title: 'Entrainement'}} />
        <Stack.Screen name="ManualTimeEntryScreen" component={ManualTimeEntryScreen} options={{title: 'Entrée manuelle'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
