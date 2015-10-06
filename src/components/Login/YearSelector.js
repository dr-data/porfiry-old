import React, { Component, PropTypes } from 'react';

class HouseSelector extends Component {
  static propTypes = {
    changeYear: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired
  }

  render() {
    const message = 'And I\'m in year...';
    const selectStyle = this.props.colours;
    
    return (
      <select style={selectStyle} onChange={this.props.changeYear}>
        <option value="" disabled selected>{message}</option>
        {this.props.years.map(year =>
          <option key={year} value={year}>Year {year}</option>
        )}
      </select>
    );
  }
}

export default HouseSelector;

