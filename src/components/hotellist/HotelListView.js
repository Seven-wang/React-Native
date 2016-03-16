'use strict';

import React from 'react-native';
import Promise from 'bluebird';

let {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Component,
  PropTypes,
  Platform,
  NativeModules,
} = React;

class ChangesList extends Component{
  async payHandle() {
    let MozartTransfer = NativeModules.MozartTransfer;
    let transfer = Promise.promisify(MozartTransfer.transfer);
    let result = await transfer(JSON.stringify({action: 'hotelDetail', params: {hotelId: '50101002'}}));
  }

  render() {
    let name = this.props.name;
    let payHandle = this.payHandle;
    return (
      <View style={styles.row}>
        {
          name.map(function(item, key) {
            return  (
              <View key={key} style={styles.rcell}>
                <TouchableOpacity onPress={payHandle}>
                  <Image
                    source={{uri: item.hotelimage}}
                    style={styles.hotelimage}
                  >
                    <View style={styles.hotelimage_hotelname}>
                      <Text style={styles.hotelimage_hotelname_text}>{item.discount}</Text>
                    </View>
                  </Image>
                  <View style={styles.hotelinfo}>
                    <Text style={styles.hotelinfo_name}>{item.hotelname}</Text>
                  </View>
                  <View style={styles.hotelinfo}>
                    <Text style={styles.hotelinfo_area}>{item.area}</Text>
                  </View>
                  <View style={styles.hotelinfo}>
                    <Text style={styles.hotelinfo_price}>￥{item.price}起</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </View> 
    );
  }
}

class HotelListView extends Component{

  static propTypes = {
    data: PropTypes.array,
    headerBackgroundImage: PropTypes.string,
  };

  static defaultProps = {
    ...Component.defaultProps,
    data: [],
  };

  constructor(props, context) {
    super(props, context);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      platform: Platform.OS,
      dataSource: ds.cloneWithRows(this.props.data),
    };
  }

  render() {
    let hotellist = this.props.hotellist;
    let cityid = this.props.cityid;
    let arr = hotellist[cityid].hoteldata.concat();
    let ar = [];
    while(arr.length)ar.push(arr.splice(0,2));
    return (
      <View style={styles.container}>
        {
          ar.map(function(name, key) {
            return  (
              <ChangesList key={key} name={name} />
            );
          })
        }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#9d1228',
  },
  row: {
    flexDirection:'row',
    backgroundColor: '#2348cc',
    paddingBottom: 10,
  },
  rcell: {
    flex: 1,
    margin: 5,
    padding: 5,
    backgroundColor:'#fff',
  },
  hotelimage: {
    height: 110,
  },
  hotelimage_hotelname: {
    height: 25,
    backgroundColor: 'rgba(0,0,0,.50)',
    justifyContent: 'center',
    position: 'absolute',
    left: 5,
    right: 0,
    bottom: 0,
  },
  hotelimage_hotelname_text: {
    color: '#ffcc00',
    fontSize:12,
  },
  hotelinfo: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  hotelinfo_name:{
    flex: 2,
    marginTop: 5,
    marginLeft: 5,
    color:'#000',
  },
  hotelinfo_area:{
    flex: 2,
    marginTop: 5,
    marginLeft: 5,
    color:'#666',
    fontSize:12,
  },
  hotelinfo_price:{
    flex: 2,
    marginTop: 5,
    marginLeft: 5,
    color:'#ef3535',
  },
  hotelinfo_btnPay:{
    flex: 1,
    backgroundColor:'#ef3535',
    marginTop: 4,
    marginBottom: 4,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});

export default HotelListView;