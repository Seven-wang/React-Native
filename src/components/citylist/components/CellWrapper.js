'use strict';

import React from 'react-native';
let {Component, PropTypes, View} = React;


class CellWrapper extends Component {

  componentDidMount() {
    this.props.updateTag && this.props.updateTag(this.refs.view.getNodeHandle(), this.props.sectionId);
  }

  render() {
    let Cell = this.props.component;
    return (
      <View ref="view">
        <Cell {...this.props} data={this.props.data} />
      </View>
    );
  }
}

CellWrapper.propTypes = {
  /**
   * The id of the section
   */
  sectionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * A component to render for each cell
   */
  component: PropTypes.func.isRequired,

  /**
   * A function used to propagate the root nodes handle back to the parent
   */
  updateTag: PropTypes.func,
};


module.exports = CellWrapper;
