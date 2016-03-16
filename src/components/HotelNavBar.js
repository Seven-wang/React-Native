'use strict';

import React from 'react-native';

let {
  StyleSheet,
  View,
  Text,
  PropTypes,
  TouchableOpacity,
} = React;

class HotelNavBar extends View {

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
  };

  static defaultProps = {
    ...View.defaultProps,
  };

  itemClickHandle(item, index){
    this.props.scrollToHotelListView(index);
  }

  render() {
    let self = this;
    let dataSource = this.props.dataSource;
    let itemClickHandle = this.itemClickHandle;
    return (
      <View style={styles.container}>
        {dataSource.map(function(item, index){
          return (
            <TouchableOpacity
              key={index}
              style={[styles.item, {backgroundColor: item.backgroundColor}]}
              onPress={itemClickHandle.bind(self, item, index)}>
              <View>
                {item.text.map(function(text, key){
                  return (
                    <Text key={key} style={styles.itemText}>{text}</Text>
                  );
                })}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#f70f49',
    marginBottom: 15,
    flexDirection:'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemText: {
    color: '#fff',
  },
});

export default HotelNavBar;
