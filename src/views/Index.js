'use strict';

import React from 'react-native';

let {
  PropTypes,
  StyleSheet,
  Image,
  Component,
  ScrollView,
  InteractionManager,
} = React;

import Promise from 'bluebird';
import HotelListView from '../components/HotelListView';
import HotelNavBar from '../components/HotelNavBar';
import Loading from '../components/Loading';
import TestData from '../TestData';
import PromotionActions from '../actions/PromotionActions';
import PromotionStore from '../stores/PromotionStore';
import AppConfigs from '../configs/AppConfigs';

let {
  IndexData,
} = TestData;

const ROURTE = 'index';

class Index extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderLoading: true,
      hotels: {},
      pageConfig: {}
    };
  }

  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {
      this.setState({renderLoading: false});
    });

    PromotionStore.addHotelsChangeListener(ROURTE, this._onChangeHotels.bind(this));
    PromotionStore.addPageConfigChangeListener(ROURTE, this._onChangePageConfig.bind(this));

    PromotionActions.fetchPageConfig(ROURTE);
    PromotionActions.fetchHotels(AppConfigs.IndexCity, ROURTE);
  }

  componentWillUnmount() {
    PromotionStore.removeHotelsChangeListener(ROURTE, this._onChangeHotels);
    PromotionStore.removePageConfigChangeListener(ROURTE, this._onChangePageConfig);
  }

  _onChangeHotels() {
    let obj = {};
    obj[AppConfigs.IndexCity] = PromotionStore.fetchHotels(AppConfigs.IndexCity, 4, 2);
    let hotels = Object.assign({}, obj, this.state.hotels);
    this.setState({hotels: hotels});
  }

  _onChangePageConfig() {
    let data = PromotionStore.fetchPageConfig(ROURTE);
    let pageConfig = Object.assign({}, data, this.state.pageConfig);
    this.setState({pageConfig: pageConfig});
  }

  measureComponent(parent, child) {
    return new Promise(function(resolve) {
      if(this.refs[parent]) {
        if(this.refs[parent].refs[child]) {
          this.refs[parent].refs[child].measure((ox, oy, width, height) => {
            resolve({ox: ox, oy: oy, width: width, height: height});
          })
        } else {
          this.refs[parent].measure((ox, oy, width, height) => {
            resolve({ox: ox, oy: oy, width: width, height: height});
          })
        }
      } else {
        resolve({ox: 0, oy: 0, width: 0, height: 0});
      }
    }.bind(this));
  }

  // 跳转指定列表
  scrollToHotelListView(index) {
    let scrollTop = 0;
    this.measureComponent('headerImage').then(function(data){
      scrollTop += data.height;
      return this.measureComponent('hotelNavBar');
    }.bind(this))
    .then(function(data){
      scrollTop += data.height;
      return this.measureComponent('hotelListView0', 'container');
    }.bind(this))
    .then(function(data){
      scrollTop += index * data.height + 10;
      this.refs.container.scrollTo(scrollTop);
    }.bind(this));
  }

  // 跳转页面
  goToPage(id) {
    this.props.navigator.push({id});
  }

  render() {
    let self = this;
    if (this.state.renderLoading) {
      return Loading.renderLoadingView();
    }
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        renderToHardwareTextureAndroid={true}
        ref="container"
        >
        <Image
          source={IndexData.headerBackgroundImage}
          style={styles.headerBackgroundImage}
          ref="headerImage" />
        <HotelNavBar
          dataSource={IndexData.HotelNavBar.dataSource}
          scrollToHotelListView={this.scrollToHotelListView.bind(this)}
          ref="hotelNavBar"
        />
        {IndexData.HotelListView.map(function(item, index){
          return (
            <HotelListView
                key={index}
                dataSource={self.state.hotels[AppConfigs.IndexCity] || []}
                header={item.header}
                goToPage={self.goToPage.bind(self)}
                ref={"hotelListView" + index}
                />
          );
        })}
      </ScrollView>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#9d1228',
  },
  headerBackgroundImage: {
    height: 238,
    resizeMode: Image.resizeMode.stretch,
  },
});

export default Index;
