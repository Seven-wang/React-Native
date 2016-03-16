'use strict';

import React from 'react-native';
let {Component, PropTypes, StyleSheet, View, Text} = React;

class SectionHeader extends Component {

  componentDidMount() {
    this.props.updateTag && this.props.updateTag(this.refs.view.getNodeHandle(), this.props.sectionId);
  }

  render() {
    let SectionComponent = this.props.component;
    let content = SectionComponent ?
      <SectionComponent {...this.props} /> :
      <Text style={styles.text}>{this.props.title}</Text>;

    return (
      <View ref="view" style={styles.container}>
        {content}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor:'#f8f8f8',
  },
  text: {
    fontWeight: '700',
  },
});

SectionHeader.propTypes = {

  /**
   * The id of the section
   */
  sectionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),

  /**
   * A component to render for each section item
   */
  component: PropTypes.func,

  /**
   * A function used to propagate the root nodes handle back to the parent
   */
  updateTag: PropTypes.func,

};

module.exports = SectionHeader;
