import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

class App extends React.Component {

  unsubscribedFromAuth = null;

  //subscribe to auth changes
  componentDidMount() {
    // this.unsubscribedFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // this.setState({ currentUser: user });
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       });
    //     })
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    //   // Required to run only once and it's done already
    //   // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items}) => ({ title, items })))
    // })
  }

  //close the subscription
  componentWillUnmount() {
    this.unsubscribedFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route
            exact 
            path='/signin' 
            render={() => this.props.currentUser ? 
              (<Redirect to='/' />) 
              : (<SignInAndSignUpPage />)
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(App);
