
import React, { Component } from 'react'


class ExampleForm extends Component {
  state = { value: '', data:[], isLoaded: false, shopItems:[] }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
    this.fetchShopItems(event.target.value)
  }

fetchShopItems(shopId){
  fetch("http://localhost:8080/api/shop/"+shopId)
  .then(response => response.json())
  .then(data => this.setState({
    shopItems: data
  }))
}

componentDidMount(){
  fetch("http://localhost:8080/api/shop")
  .then(response => response.json())
  .then(data => this.setState({
    data: data,
    isLoaded:true
  }))
}

  render() {
    const {value, data, isLoaded, shopItems} = this.state
    return (
      <form>
        <select value={value} onChange={this.handleChange}>
          <option value=""></option>
          {isLoaded && data.map(item => (
            <option key={item.shopId} value={item.shopId}>{item.name}</option>
         ))}
        </select>
        {this.state.value!=='' &&
        <select>
          <option value=""></option>
          {isLoaded && shopItems.map(item => (
            <option key={item.itemId} value={item.itemId}>{item.name}</option>
         ))}
        </select>}

      </form>
    );
  }
}
export default ExampleForm