'use strict';

import React from 'react-native';
import SelectableSectionsListView from '../components/citylist/index';
import Loading from '../components/Loading';
import TestData from '../TestData';

let {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableOpacity,
  InteractionManager,
} = React;

let {
  CityData,
} = TestData;

let navigator = {};
let changeDetail = {};

class SectionHeader extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionItem}>{this.props.title}</Text>
      </View>
    );
  }
}

class Cell extends Component {

  // 跳转页面
  goToPage() {
    changeDetail(this.props.item);
    navigator.pop();
  }
  headerClickHandle() {
    this.goToPage('detail');
  }
  render() {
    let headerClickHandle = this.headerClickHandle.bind(this);
    let length = this.props.data[this.props.sectionId].length - 1;
    let index = this.props.index;
    return (
      <TouchableOpacity onPress={headerClickHandle}>
        <View style={[index == length && styles.cellviewt, index != length && styles.cellview]}>
          <Text style={styles.celltext}>{this.props.item}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class CityList extends Component {

  constructor(props, context) {
    super(props, context);

    navigator = this.props.navigator;
    changeDetail = this.props.route.callback;
    CityData.renderPlaceholderOnly = true;
    this.state =  CityData;
    
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  render() {
    
    if (this.state.renderPlaceholderOnly) {
      return Loading.renderLoadingView();
    }
    
    return (
      <SelectableSectionsListView
        data={this.state.data}
        cell={Cell}
        cellHeight={30}
        sectionListItem={SectionItem}
        sectionHeader={SectionHeader}
        sectionHeaderHeight={22.5}
      />
    );
  }
}

let styles = StyleSheet.create({
  textStyle: {
    color:'#555',
    fontSize:16,
    height:20,
  },
  viewStyle: {
    backgroundColor: '#f5f5f5',
    paddingLeft:10,
    justifyContent:'center',
  },
  sectionView:{
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:10,
    paddingBottom:3,
  },
  sectionItem:{
    color:'#087fff',
    fontSize:12,
  },
  cellview:{
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    backgroundColor:'#fff',
    height:40,
    padding:10,
    marginLeft:10,
    marginRight:10,
  },
  cellviewt:{
    backgroundColor:'#fff',
    padding:10,
    marginLeft:10,
    marginRight:10,
  },
  celltext:{
    color:'#242424',
  },
});

export default CityList;
