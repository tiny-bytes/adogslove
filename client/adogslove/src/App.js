import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/breeds/')
      .then(res => this.setState({ breeds: res.data }))
      .catch(alert);
  }

  render() {
    const { breeds } = this.state;

    return (
      <div className="App">
        {/* Buttons to interact with API */}
        <button onClick={this.createBreed}>Create Breed</button>
        <button onClick={this.deleteBreeds}>Delete Breeds</button>
        <button onClick={this.seedBreeds}>Seed Breeds</button>
        {/* List of breeds in Cosmos DB */}
        <ul>
          {breeds.map(breedModel => (
            <li
              style={{ listStyleType: 'none', margin: '20px', borderBottom: '1px solid black' }}
              key={breedModel._id}
            >
              {breedModel.breed}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  createBreed = () => {
    const breed = prompt('Enter a breed: ');
    if (!breed) return;
    axios
      .post('/api/breedss/create', { breed })
      .then(res => this.setState({ breeds: [...this.state.breeds, res.data.newBreed] }))
      .catch(err => alert(`Failed to create breed\n${JSON.stringify(err)}`));
  };

  deleteBreeds = () => {
    const doDelete = window.confirm('Delete all Breeds?');
    if (!doDelete) return;
    axios
      .delete('/api/breeds/')
      .then(res => this.setState({ breeds: [] }))
      .catch(err => alert(`Failed to delete all breeds\n${JSON.stringify(err)}`));
  };

  seedBreeds = () => {
    const doSeed = window.confirm('Do you want to seed random data?');
    if (!doSeed) return;
    axios
      .post('/api/breeds/seed', {})
      .then(() => {
        axios
          .get('/api/breeds/')
          .then(res => this.setState({ breeds: res.data }))
          .catch(alert);
      })
      .catch(alert);
  };
}

export default App;