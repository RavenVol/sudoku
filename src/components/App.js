import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Header from './Header';
import About from './About';
import Sudoku from './Sudoku';
import Solver from './Solver';
import {bgImages} from './bgImages';

// import Footer from 'Footer';

import '../styles/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstTime: false,
      rerander: true,
    }
  }

  setFirstTime = (first) => {
    this.setState({firstTime: first,});
  }

  rerander = () => {
    this.setState(prevState => ({rerander: !prevState.rerander,}));
  }

  render() {
    if (this.state.firstTime) {
      return (<Home setFirstTime={this.setFirstTime} firstTime={this.state.firstTime}/>);
    }

    return (
      <div
        className="App"
        style={{backgroundImage: bgImages[Math.floor(Math.random()*bgImages.length)]}}>
        <Header rerander={this.rerander}/>

        <main className="main">
          <Switch>
            <Route path='/' exact
              render={() => <Home
                setFirstTime={this.setFirstTime}
                firstTime={this.state.firstTime}
              />}
            />
            <Route path='/about' exact component={About} />
            <Route path='/sudoku' exact component={Sudoku} />
            <Route path='/solver' exact component={Solver} />
          </Switch>
        </main>
        {/*<Footer /> */}
      </div>
    )
  }
}

export default App;
