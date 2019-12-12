import React from "react"
import "./App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planet: null
    }
  }
  componentDidMount() {
    fetch('http://localhost:5000/planets/45')
      .then(res => res.json())
      .then(planet => this.setState({ planet: planet }))
  }
  render() {
    return (
      <div>
        {this.state.planet ? (
          <ul className="planet">
            <li><strong>ID:</strong> {this.state.planet.id}</li>
            <li><strong>Name:</strong> {this.state.planet.name}</li>
          </ul>
        ) : (
          <div>Loading</div>
        )}
      </div>
    )
  }
}
