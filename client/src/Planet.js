import React from "react"
import "./App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planet: null,
      terrainList: null,
      showEllipsis: true
    }
  }

  componentDidMount() {
    // getting the url parameter with react-router  
    const { match: { params }} = this.props
    fetch(`http://localhost:5000/planets/${params.id}`)
      .then(res => res.json())
      .then(data => {
        // convert the "terrain" data from comma separated strings to an array
        this.formatData(data)
      })
  }

  /**
   * when terrain values are displayed, the ellipsis is hidden and vice versa
   */
  toggleTerrain() {    
    const ellipsisVal = this.state.showEllipsis ? false: true
    this.setState({showEllipsis: ellipsisVal })
  }

  /**
   * convert the data from comma separated strings to an array
   * @param {*} data 
   */
  formatData(data) {
    const terrainList = data.terrain.split(',').map(e => e.trim())
    this.setState({planet: data, terrainList: terrainList })
  }

  render() {
    let listItems
    if (this.state.terrainList){
       listItems = this.state.terrainList.map(terrain =>
        <li key={terrain}>{terrain}</li>
      )
    }
    return (
      <div>
        {this.state.planet ? (
          <ul className="planet">
            <li><strong>ID:</strong> {this.state.planet.id}</li>
            <li><strong>Name:</strong> {this.state.planet.name}</li>
            <li><span className="terrain-label" onClick={() => this.toggleTerrain()}><strong>Terrain:</strong>
              {this.state.showEllipsis   ? 
                <span className="ellipsis">....</span> : ''
                }
                </span>
              {!this.state.showEllipsis   ? 
                <ul>{listItems}</ul> : ''
              }
            </li>
          </ul>
        ) : (
          <div>Loading</div>
        )}
      </div>
    )
  }
}
