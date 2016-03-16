'use strict';

import React from 'react-native';

let {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Image,
} = React;

class Header extends Component {

  // 跳转页面
  goback() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.goback.bind(this)}>
          <View style={[styles.headerview, styles.backwidth]}>
            <Image
              source={{uri: 'http://m.elongstatic.com/static/webapp/hotel/2015/05/v1/img/back.png'}}
              style={styles.backimg}
            />
          </View>
        </TouchableOpacity>
        <View style={[styles.headerview, styles.backpadding]}>
          <Text style={styles.headertext}> {this.props.text}</Text>
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection:'row',
  },
  headerview:{
    flex: 1,
  },
  headertext:{
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backwidth:{
    paddingLeft:10,
    justifyContent:'center',
    width: 50,
    height: 50,
  },
  backpadding:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:-50,
  },
  backimg: {
    height: 18,
    width: 15,
    resizeMode: Image.resizeMode.stretch,
  }
});

export default Header;
