//-----------  Imports  -----------//

import _                 from 'lodash'
import update            from 'react-addons-update'

import React             from 'react'
import { Table, Column } from 'fixed-data-table-2'

import BasicCell         from '../components/table/basic-cell'
import SortHeader        from '../components/table/sort-header'

//-----------  Definitions  -----------//

const SortTypes = { ASC: 'ASC', DESC: 'DESC' }

//-----------  Class Setup  -----------//

class TableWrapper extends React.Component {

  static propTypes = {
    columns  : React.PropTypes.array.isRequired,
    rows     : React.PropTypes.array.isRequired,
    type     : React.PropTypes.string.isRequired,
    sort_col : React.PropTypes.string,
    actions  : React.PropTypes.object
  }

  state = {
    data        : this.props.rows,
    columnDirs  : { [this.props.sort_col]: SortTypes.DESC },
    sortIndex   : this._defaultSortIndex(this.props.rows),
    renderPage  : false,
    tableWidth  : 600,
    tableHeight : 600
  }

  componentDidMount(){
    this._updateSize()
    $(window).resize(this._onResize)
  }

  componentDidUpdate(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  //-----------  Helpers  -----------//

  _defaultSortIndex(rows){
    let sortIndexes = []
    rows.forEach((value, index) => sortIndexes.push(index))
    return sortIndexes
  }

  _getTitle(){
    switch (this.props.type){
      case 'jobs'         : return 'Jobs'
      case 'cases'        : return 'Cases'
      case 'parties'      : return 'Parties'
      case 'clients'      : return 'Clients'
      case 'contacts'     : return 'Client Contacts'
      case 'services'     : return 'Services'
    }
  }

  //-----------  Resize Events  -----------//

  _onResize = () => {
    clearTimeout(this._updateTimer)
    this._updateTimer = setTimeout(this._updateSize, 16)
  }

  _updateSize = () => {
    const table_height = $('#page-wrapper').innerHeight() - $('.table-header').outerHeight()
    const table_width  = $('#page-wrapper').innerWidth()

    this.setState({
      renderPage  : true,
      tableWidth  : table_width,
      tableHeight : table_height
    });
  }

  //-----------  Event Handlers  -----------//

  _onSortChange = (columnKey, sortDir) => {
    const { data, sortIndex } = this.state
    const newIndex = sortIndex.slice()

    newIndex.sort((indexA, indexB) => {
      const valueA = data[indexA][columnKey]
      const valueB = data[indexB][columnKey]
      let sortVal = 0

      if (valueA > valueB){ sortVal = 1 }
      if (valueA < valueB){ sortVal = -1 }
      if (sortVal !== 0 && sortDir === SortTypes.ASC){ sortVal = (sortVal * -1) }

      return sortVal
    })

    this.setState({
      sortIndex  : newIndex,
      columnDirs : { [columnKey]: sortDir },
    })
  }

  _updateData = (resource) => {
    const index = _.findIndex(this.state.data, { id: resource.id })
    this.setState( update( this.state, {
      data: { [index] : { $merge: resource }}
    }))
  }

  // _deleteData = (resource) => {
  //   const index = _.findIndex(this.state.data, { id: resource.id })
  //   this.setState( update( this.state, {
  //     data: { $splice: [[index, 1]] }
  //   }))
  // }

  //-----------  HTML Element Render  -----------//

  render(){
    const { data, tableWidth, tableHeight, sortIndex, columnDirs } = this.state
    const title = this._getTitle()

    return (
      <div className="table-wrapper">
        <div className="table-header row">
          <div className="col-sm-7">
            <h1 className="pull-left">{title}</h1>
          </div>
          <div className="col-sm-5">
            <div className="input-group">
              <div className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><a href="#">Filter by...</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>
              <input type="text" className="form-control" aria-label="..." placeholder="Search..."></input>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
              </span>
            </div>
          </div>
        </div>

        {this.state.renderPage &&
          <Table
            width={tableWidth}
            height={tableHeight}
            rowHeight={50}
            rowsCount={data.length}
            headerHeight={35}
            >

            {this.props.columns.map((column, index, columns) => {
              const width     = (tableWidth / columns.length)
              const col_key   = column[0]
              const col_title = column[1]

              return (
                <Column
                  key={col_key}
                  width={width}
                  columnKey={col_key}
                  header={
                    <SortHeader
                      sortDir={columnDirs[col_key]}
                      sortTypes={SortTypes}
                      onSortChange={this._onSortChange}
                      >
                      {col_title}
                    </SortHeader>
                  }
                  cell={({rowIndex, ...props}) => (
                    <BasicCell
                      data={data[sortIndex[rowIndex]][col_key]}
                      editRow={this._updateData}
                      //deleteRow={this._deleteData}
                      />
                  )}
                />
              );
            })}
          </Table>
        }
      </div>
    )
  }
}

//-----------  Export  -----------//

export default TableWrapper
