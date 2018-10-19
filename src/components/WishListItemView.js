import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'

import WishListItemEdit from './WishListItemEdit'

class WishListItemView extends Component {
    constructor() {
        super()
        this.state = { isEditing : false }
    }
    render() {
        const { item } = this.props
        return this.state.isEditing ? (
            this.renderEditable()
        ) : (
            <li className="item">
                {item.image && <img src={item.image} alt={item.name}/>}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={this.onToggleEdit}>✏️</button>
                    <button onClick={item.remove}>❌</button>
                </span>
            </li>
        )
    }
    
    onToggleEdit = () => {
        this.setState({ 
            isEditing : true, 
            clone: clone(this.props.item) 
        })
    }

    onCancelEdit = () => {
        this.setState({ 
            isEditing : false
        })
    }

    onSaveEdit = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone))
        this.setState({
            isEditing: false,
            clone: null
        })
    }

    renderEditable = () => {
        return (
            <li className="item">
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.onSaveEdit}>💾</button>
                <button onClick={this.onCancelEdit}>❌</button>
            </li>
        )
    }

}

export default observer(WishListItemView)