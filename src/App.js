import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch, Link } from 'react-router-dom';

import './App.css';

const HatsPage = () => {
  return(
    <div>
      <h1>HATS PAGE</h1>
    </div>
  )
}

const TopicDetail = (props) => {
  return (
    <div>
      <Link to='/'>HOME PAGE LINK</Link>
      <button onClick={() => props.history.push('/')}>History button</button>
      <h1>TOPIC DETAIL PAGE</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop/hats' component={HatsPage}/>
        <Route exact path='/topic/:topicId' component={TopicDetail}/>
      </Switch>
    </div>
  );
}

export default App;
