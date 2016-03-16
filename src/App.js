'use strict';

import React from 'react-native';

let {
  View,
  Navigator,
  Component,
  BackAndroid,
  StyleSheet,
} = React;

import Index from './views/Index';
import Detail from './views/Detail';
import CityList from './views/CityList';
import Header from './views/Header';

let gNavigator;


BackAndroid.addEventListener('hardwareBackPress', () => {
  if (gNavigator.getCurrentRoutes().length === 1) {
    return false;
  }
  gNavigator.pop();
  return true;
});

class App extends Component {
  
  renderSceneAndroid(route, navigator) {
    gNavigator = navigator;
    if(route.id == 'index') {
      return (
        <View style={styles.container}>
          <Header navigator={navigator} route={route} text={'12.12 旺销酒店'} />
          <Index navigator={navigator} route={route} />
        </View>
      );
    } else if(route.id == 'detail') {
      return (
      <View style={styles.container}>
        <Header navigator={navigator} route={route}  text={'选择酒店'} />
        <Detail navigator={navigator} route={route} />
      </View>
      );
    } else if(route.id == 'citylist') {

      return (
      <View style={styles.container}>
        <Header navigator={navigator} route={route}  text={'选择目的地'}  />
        <CityList navigator={navigator} route={route} />
      </View>
      );
    }
  }

  render() {

    let renderScene = this.renderSceneAndroid;

    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{id: 'index'}}
        renderScene={renderScene}
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
