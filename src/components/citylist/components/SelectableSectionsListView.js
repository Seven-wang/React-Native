'use strict';

import React from 'react-native';
import merge from 'merge';
import SectionHeader from './SectionHeader';
import SectionList from './SectionList';
import CellWrapper from './CellWrapper';

let {Component, ListView, StyleSheet, View, PropTypes,ScrollView} = React;

class SelectableSectionsListView extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (prev, next) => prev !== next,
      }),
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);

  }

  renderSectionHeader(sectionData, sectionId) {
    let title = this.props.getSectionTitle ? this.props.getSectionTitle(sectionId) : sectionId;

    return (
      <SectionHeader
        component={this.props.sectionHeader}
        title={title}
        sectionId={sectionId}
        sectionData={sectionData}
      />
    );
  }

  renderRow(item, sectionId, index) {
    let CellComponent = this.props.cell;
    index = parseInt(index, 10);

    let props = {
      sectionId,
      index,
      item,
      onSelect: this.props.onCellSelect,
    };

    return index === 0 && this.props.useDynamicHeights ?
      <CellWrapper
        component={CellComponent}
        data={this.props.data}
        {...props}
        {...this.props.cellProps} 
      /> :
      <CellComponent
        {...props}
        {...this.props.cellProps}
        data={this.props.data}
      />;
  }

  scrollcity(index) {
    this.scrollview.scrollTo(index);
  }

  render() {
    let data = this.props.data;
    let dataIsArray = Array.isArray(data);
    let sectionList;
    let renderSectionHeader;
    let dataSource;

    if (dataIsArray) {
      dataSource = this.state.dataSource.cloneWithRows(data);
    } else {
      sectionList = !this.props.hideSectionList ?
        <SectionList
          style={this.props.sectionListStyle}
          sections={Object.keys(data)}
          getSectionListTitle={this.props.getSectionListTitle}
          component={this.props.sectionListItem}
          data={this.props.data}
          scrollcity={this.scrollcity.bind(this)}
        /> :
        null;

      renderSectionHeader = this.renderSectionHeader;
      dataSource = this.state.dataSource.cloneWithRowsAndSections(data);
    }

    let props = merge(this.props, {
      dataSource,
      renderRow: this.renderRow,
      renderSectionHeader,
    });

    props.style = void 0;
    props.initialListSize=48;

    return (
      <View ref="view" style={[styles.container, this.props.style]}>
        <ScrollView ref={(ref) => (this.scrollview = ref)} >
          <ListView
            ref="listview"
            initialListSize= "48"
            scrollRenderAheadDistance="1000"
            {...props}
          />
        </ScrollView>
        {sectionList}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

let stylesheetProp = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
]);

SelectableSectionsListView.propTypes = {
  /**
   * The data to render in the listview
   */
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,

  /**
   * Whether to show the section listing or not
   */
  hideSectionList: PropTypes.bool,

  /**
   * Functions to provide a title for the section header and the section list
   * items. If not provided, the section ids will be used (the keys from the data object)
   */
  getSectionTitle: PropTypes.func,
  getSectionListTitle: PropTypes.func,

  /**
   * Callback which should be called when a cell has been selected
   */
  onCellSelect: PropTypes.func,

  /**
   * The cell element to render for each row
   */
  cell: PropTypes.func.isRequired,

  /**
   * A custom element to render for each section list item
   */
  sectionListItem: PropTypes.func,

  /**
   * A custom element to render for each section header
   */
  sectionHeader: PropTypes.func,
  /**
   * An object containing additional props, which will be passed
   * to each cell component
   */
  cellProps: PropTypes.object,

  /**
   * Whether to determine the y postion to scroll to by calculating header and
   * cell heights or by using the UIManager to measure the position of the
   * destination element. This is an exterimental feature
   */
  useDynamicHeights: PropTypes.bool,

  /**
   * Styles to pass to the container
   */
  style: stylesheetProp,

  /**
   * Styles to pass to the section list container
   */
  sectionListStyle: stylesheetProp,

};


module.exports = SelectableSectionsListView;
