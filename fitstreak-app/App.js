import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const App = () => {
  return (

    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <View style={styles.GreetingContainer}>
          <Text style={styles.GreetingText}>Bonjour Robin !</Text>
        </View>
        <View style={styles.StreakContainer}>

        </View>
      </View>
      <View style={styles.BigText}>
        <Text style={styles.BigText}>Rien à voir ici. Démarre un entrainement pour commencer.</Text>
      </View>
      <View style={styles.NavContainer}>
        <Button title="Démarrer" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: '20%',
    paddingBottom: '8%',
    backgroundColor: '#1C1C1C',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TitleText: {
    color: '#ffff',
  },
  BigText: {
    color: '#ffff',
  },

  HeaderContainer: {
    width: '100%',
    height: '100%',
  },
  GreetingContainer: {
    height: '100px',
  },
  GreetingText: {
    color: '#ffff',
  },

  StreakContainer: {
    backgroundColor: '#393939',
    height: '24%',
    width: '100%',
  },

  ContentContainer: {
    backgroundColor: '#F9AF5E',
  },
  NavContainer: {

  },
});

export default App;