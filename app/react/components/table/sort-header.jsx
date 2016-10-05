//-----------  Imports  -----------//

import React    from 'react'
import { Cell } from 'fixed-data-table-2'

//-----------  Class Setup  -----------//

class SortHeader extends React.Component {

  static propTypes = {
    sortTypes    : React.PropTypes.object.isRequired,
    onSortChange : React.PropTypes.func,
    sortDir      : React.PropTypes.string
  }

  //-----------  Helpers  -----------//

  _reverseSortDirection(sortDir){
    const { sortTypes } = this.props
    return sortDir === sortTypes.DESC ? sortTypes.ASC : sortTypes.DESC
  }

  //-----------  Event Handlers  -----------//

  _onSortChange = () => {
    const { columnKey, sortDir, onSortChange, sortTypes } = this.props

    if (onSortChange){
      onSortChange(columnKey, (sortDir ? this._reverseSortDirection(sortDir) : sortTypes.DESC))
    }
  }

  //-----------  HTML Element Render  -----------//

  render() {
    const { sortDir, onSortChange, sortTypes, children, ...props } = this.props

    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === sortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    )
  }
}

//-----------  Export  -----------//

export default SortHeader
