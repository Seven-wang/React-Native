'use strict';

import React from 'react-native';

let {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Component,
  Platform,
} = React;

class Nav extends Component{

  static defaultProps = {
    ...Component.defaultProps,
    data: [],
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Platform.OS,
    };
  }

  headerClickHandle() {
    this.props.goToPage('citylist');
  }

  headerClickCity(cityname,reRender,citylist) {
    reRender(cityname,citylist);
  }

  render() {
    let headerClickHandle = this.headerClickHandle.bind(this);
    let headerClickCity = this.headerClickCity;
    let reRender = this.props.reRender;
    let headercitynumber = this.props.headercitynumber;
    let citylist = this.props.citylist;
    return (
      <View style={styles.citynav}>
          {
            citylist.map(function(item,index) {
              if(index == headercitynumber && index < 3){
                return  (
                    <View key={index} style={styles.item}>
                      <Text style={[index == headercitynumber && styles.itemcolor, index != headercitynumber && styles.item_text]}>{item.cityname} </Text>
                    </View>
                );
              }else if( index < 3 ){
                return  (
                  <TouchableOpacity key={index} onPress={headerClickCity.bind(this,item.cityname,reRender,citylist)} style={styles.item}>
                    <View>
                      <Text style={[index == headercitynumber && styles.itemcolor, index != headercitynumber && styles.item_text]}>{item.cityname} </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }
          )
          }
          <TouchableOpacity  onPress={headerClickHandle}  style={styles.item}>
            <View>
              <Text style={styles.item_text}>更多城市 ({this.props.citynumber.number})</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  citynav: {
    backgroundColor: '#2348cc',
    flexDirection:'row',
    paddingBottom: 10,
  },
  item: {
    backgroundColor: '#0628a2',
    margin:2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  item_text: {
    fontSize: 12,
    color: '#fff',
  },
  itemcolor:{
    color:'#fffc00',
  },
});

export default Nav;
