import React, { Component } from 'react';
// import "./css/bootstrap.css";
import LoginPage from '../pages/LoginPage/LoginPage';
import ItemModal from '../ItemModal'
import NewGiggleLib from '../components/NewGiggleLib';
import MakeLib from "../components/MakeLib"

class Homepage extends React.Component {
constructor(props) {
    super(props)

    this.state = {
      items: [
        {showModal: false },
        
      ],
    }
    this.handleItemChange = this.handleItemChange.bind(this)
  }

  handleNewUserInput = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  handleFormUpdate() {
    return e => {
      const field = e.target.name
      const { form } = this.state
      form[field] = e.target.value
      this.setState({ form })
    }
  }

  handleModalHide() {
    return () => {
      let { items } = this.state
      items = items.map(item => ({
        ...item,
        showModal: false,
      }))
      this.setState({ items })
    }
  }

  handleModalShow() {
    return e => {
      e.preventDefault()

      this.setState({ showModal: true })
    }
  }

  handleEditItem(selectedItem) {
    return e => {
      e.preventDefault()
      let { items } = this.state
      items = items.map(item => ({
        ...item,
        showModal: selectedItem.id === item.id,
      }))
      this.setState({ items })
    }
  }

  handleItemChange(itemId) {
    return e => {
      let { items } = this.state
      items = items.map(item => {
        if (item.id === itemId) {
          item[e.target.name] = e.target.value
        }
        return item
      })
      this.setState({ items })
    }
  }
  render(){
      const {items} = this.state
  return(
    <div>
        <div className="box">
        <h1>Welcome to Gigglelibs!</h1>
        </div>
        <table className="table">
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <a
                    className="btn btn-primary"
                    onClick={this.handleEditItem(item)}
                  >
                    Your Gigglelibs
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.map((item, index) => (
          <ItemModal
            key={item.id}
            show={item.showModal}
            onHide={this.handleModalHide()}
            onItemChange={this.handleItemChange}
            item={item}
          />
        ))}
        <NewGiggleLib
          handleNewUserInput={this.handleNewUserInput}
          username={this.props.username}
          templates={this.props.templates}
          baseURL={this.props.baseURL}
        />
        Make Lib
        <MakeLib />
         </div>
    )
  }
}
    
    
    export default Homepage;