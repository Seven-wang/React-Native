'use strict';

import React from 'react-native';
import Promise from 'bluebird';

let {
  StyleSheet,
  View,
  Text,
  Image,
  PropTypes,
  ListView,
  TouchableOpacity,
  NativeModules,
  Component,
} = React;

class HotelListView extends Component {

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    header: PropTypes.object.isRequired,
  };

  static defaultProps = {
    ...View.defaultProps,
  };

  constructor(props, context) {
    super(props, context);

    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.dataSource.cloneWithRows(this.props.dataSource),
    };
  }

  headerClickHandle() {
    this.props.goToPage('detail');
  }

  async jumpToDetail(id) {
    let MozartTransfer = NativeModules.MozartTransfer;
    if(!id) {
      id = '50101002';
    }
    let transfer = Promise.promisify(MozartTransfer.transfer);
    let result = await transfer(JSON.stringify({action: 'hotelDetail', params: {hotelId: id}}));
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({
      dataSource: this.dataSource.cloneWithRows(nextProps.dataSource)
    });
  }

  render() {
    let header = this.props.header;
    let headerClickHandle = this.headerClickHandle.bind(this);
    let jumpToDetail = this.jumpToDetail.bind(this);
    return (
      <View style={styles.container} ref="container">
        <TouchableOpacity onPress={headerClickHandle}>
          <View>
            <Image
              source={header.backgroundImage}
              style={styles.header_backgroundImage}
            />
          </View>
        </TouchableOpacity>
        <ListView
          initialListSize={6}
          pageSize={6}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={function(rowData) {
            return (
              <View style={styles.row}>
                {rowData.map(function(item, index) {
                  return  (
                    <View style={[index == 0 && styles.lcell, index != 0 && styles.rcell]} key={index}>
                    <TouchableOpacity onPress={()=>(jumpToDetail(item.hotelId))}>
                        <Image style={styles.hotelimage} source={{uri: item.hotelImage}}>
                            <View style={styles.hotelstar}>
                              <Text style={styles.hotelstar_text}>{item.star}</Text>
                            </View>
                            <View style={styles.hotelname}>
                              <Text style={styles.hotelname_text}>{item.hotelName}</Text>
                            </View>
                        </Image>
                        <View style={styles.hotelinfo}>
                          <Text style={styles.hotelprice}>￥{item.price}起</Text>
                            <View style={styles.hotelpayBtn}>
                              <Text style={styles.hotelpayBtn_text}>{item.paytype}</Text>
                            </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#ea1244',
    marginBottom: 15,
  },
  header_backgroundImage: {
    height: 61,
    resizeMode: Image.resizeMode.stretch,
  },
  list: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  row: {
    flexDirection:'row',
    marginBottom: 10,
  },
  lcell: {
    flex: 1,
    marginRight: 5,
  },
  rcell: {
    flex: 1,
    marginLeft: 5,
  },
  hotelimage: {
    height: 110,
  },
  hotelstar: {
    height: 45,
    width: 45,
    backgroundColor: 'rgba(157,18,40,.7)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 3,

  },
  hotelstar_text: {
    color: '#fff',
  },
  hotelname: {
    height: 25,
    backgroundColor: 'rgba(0,0,0,.50)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  hotelname_text: {
    color: '#fff',
  },
  hotelinfo: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  hotelprice:{
    flex: 2,
    marginTop: 5,
    marginLeft: 5,
    color:'#ef3535',
  },
  hotelpayBtn:{
    flex: 1,
    backgroundColor:'#ef3535',
    marginTop: 4,
    marginBottom: 4,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  hotelpayBtn_text: {
    color:'#fff',
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 4,
    marginRight: 4,
  },
});

export default HotelListView;
