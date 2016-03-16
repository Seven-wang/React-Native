'use strict';

import React from 'react-native';

let {
  View,
  StyleSheet,
} = React;

class Loading {

  static renderLoadingView() {
    return (
      <View key="1" style={styles.container}>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
