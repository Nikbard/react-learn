import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz';
import QuizeList from './containers/QuizeList/QuizeList';
import Auth from './containers/Auth/Auth';
import QuizeCreator from './containers/QuizeCreator/QuizeCreator';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import {autoLogin} from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizeList} />
          <Redirect to="/"/>
        </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizeCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizeList} />
          <Redirect to="/"/>
        </Switch>
    )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));