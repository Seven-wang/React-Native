'use strict';

import React from 'react-native';
import Nav from '../components/hotellist/Nav';
import HotelListView from '../components/hotellist/HotelListView';
import Loading from '../components/Loading';
import TestData from '../TestData';

let {
  StyleSheet,
  Image,
  ScrollView,
  Component,
  InteractionManager,
} = React;

let {
  DetailData,
} = TestData;

class Detail extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      cityid: this.props.route.cityid || 0,
      citylist: DetailData.citylist,
      headercitynumber: 0,
      renderPlaceholderOnly: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false,});
    });
  }

  nameforid(cityname,citylist){
    let cityid = 0;
    for( var i = 0 ; i < citylist.length; i++){
      if (cityname == citylist[i].cityname) { 
        cityid = citylist[i].cityid;
      }
    }
    this.cityheaderchange(cityname,cityid,citylist);
  }

  reRender(cityname) {
    this.nameforid(cityname,DetailData.citylist);
  }

  cityheaderchange(onecityname,cityid,citylist){
    if (onecityname != citylist[1].cityname && onecityname != citylist[2].cityname) 
    { 
      this.setState({
        citylist: [
          {
            cityname:onecityname,
            cityid,
          },
          {
            cityname:citylist[1].cityname,
            cityid:citylist[1].cityid,
          },
          {
            cityname:citylist[2].cityname,
            cityid:citylist[2].cityid,
          },
        ],
        headercitynumber: 0,
        cityid,
      }); 
    }else{
      this.setState({
        headercitynumber: cityid,
        cityid,
      });
    }
  }

  // 跳转页面
  goToPage(id) {
    this.props.navigator.push({id, callback: this.reRender.bind(this)});
  }

  render() {

    if (this.state.renderPlaceholderOnly) {
      return Loading.renderLoadingView();
    }
    
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        ref={(ref) => (this.scrollview = ref)}
        renderToHardwareTextureAndroid={true} >
        <Image
          source={DetailData.headerhotellistImage}
          style={styles.header}
        />
        <Nav 
          citylist={this.state.citylist} 
          citynumber={DetailData.citynumber}
          goToPage={this.goToPage.bind(this)}
          cityid={this.state.cityid}
          reRender={this.reRender.bind(this)}
          headercitynumber={this.state.headercitynumber}
        />
        <HotelListView
          citylist={this.state.citylist} 
          hotellist={DetailData.hotellist}
          cityid={this.state.cityid}
        />
      </ScrollView>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#9d1228',
  },
  header: {
    height: 189,
    resizeMode: Image.resizeMode.stretch,
  },
});

export default Detail;
