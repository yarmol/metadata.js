import React, { Component, PropTypes } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import PrintIcon from 'material-ui/svg-icons/action/print';
import AttachIcon from 'material-ui/svg-icons/editor/attach-file';

import Filter from '../DataSelection';

import classes from './DataList.scss'

export default class DataListToolbar extends Component{

  static propTypes = {

    handleAdd: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,

    handleSelectionChange: PropTypes.func.isRequired,
    selectionValue: PropTypes.object.isRequired,

    handlePrint: PropTypes.func.isRequired,
    handleAttachment: PropTypes.func.isRequired,
  }

  render(){
    const props = this.props;
    return (

      <Toolbar className={classes.toolbar}>
        <ToolbarGroup firstChild={true}>
          <IconButton touch={true} onTouchTap={props.handleAdd}>
            <AddIcon />
          </IconButton>
          <IconButton touch={true} onTouchTap={props.handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton touch={true} onTouchTap={props.handleRemove}>
            <RemoveIcon />
          </IconButton>

          <ToolbarSeparator />
          <Filter selectionChange={props.handleSelectionChange} selectionValue={props.selectionValue} />
        </ToolbarGroup>

        <ToolbarGroup>

          <IconMenu
            iconButtonElement={
              <IconButton touch={true} tooltip="Дополнительно">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Печать" leftIcon={<PrintIcon />} onTouchTap={props.handlePrint} />
            <MenuItem primaryText="Вложения" leftIcon={<AttachIcon />} onTouchTap={props.handleAttachment} />

          </IconMenu>
        </ToolbarGroup>

      </Toolbar>
    )
  }
}

