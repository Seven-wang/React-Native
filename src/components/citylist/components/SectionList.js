'use strict';

import React from 'react-native';
let {Component, PropTypes, StyleSheet, View, Text,TouchableOpacity} = React;

class SectionList extends Component {

  Clickcity(index) {
    let length = 0;
    let name = Object.keys(this.props.data); 
    for(let i = 0;i < index ; i++) {
      let namenow = name[i];
      length = length + this.props.data[namenow].length;
    }
    length = length*40 + index*19;
    this.props.scrollcity(length);
  }

  render() {
    let Clickcity = this.Clickcity;
    let SectionComponent = this.props.component;
    let sections = this.props.sections.map((section, index) => {

      let title = this.props.getSectionListTitle ?
        this.props.getSectionListTitle(section) :
        section;

      let child = SectionComponent ?
        <TouchableOpacity onPress={Clickcity.bind(this,index)}>
          <SectionComponent
            sectionId={section}
            title={title}
          />
        </TouchableOpacity>
        :
        <View style={styles.item}>
          <Text style={styles.text}>{title}</Text>
        </View>;
      return (
        <View key={index}>
          {child}
        </View>
      );
    });

    return (
      <View style={[styles.container, this.props.style]}>
        {sections}
      </View>
    );
  }
}


SectionList.propTypes = {

  /**
   * A component to render for each section item
   */
  component: PropTypes.func,

  /**
   * Function to provide a title the section list items.
   */
  getSectionListTitle: PropTypes.func,

  /**
   * The sections to render
   */
  sections: PropTypes.array.isRequired,

  /**
   * A style to apply to the section list container
   */
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
};

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems:'center',
    justifyContent:'center',
    right: 0,
    top: 0,
    bottom: 0,
    width: 35,
  },

  item: {
    padding: 0,
    justifyContent:'center',
    alignItems:'center',
  },

  text: {
    fontWeight: '500',
    color: '#0c7eff',
  },
});

module.exports = SectionList;
