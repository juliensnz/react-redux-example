import * as React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger'
import './App.css';



const clicked = (state: any = 0, action: any) => {
  if ('CLICKED' === action.type) {
    return state + 1;
  }

  return state;
}

const total = (state: any = 0, action: any) => {
  if ('ADD' === action.type) {
    return state + 1;
  }
  if ('SUBSTRACT' === action.type) {
    return state - 1;
  }

  return state;
}

let store = createStore(combineReducers({
  clickedCount: clicked,
  total: total
}), applyMiddleware(logger));

console.log(store.getState());

// const alerting = () => {
//   store.dispatch({type: 'CLICKED'});
// }

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AddButton /><br/>
          <SubButton />
        </div>
      </Provider>
    );
  }
}

const Button = ({action, label}: {action: () => any, label: string}) => {
  return (
    <span onClick={action}>{label}</span>
  );
}

const mapStateToProps = (state: any) => {
  return {
    label: `clicked ${state.clickedCount} times`
  };
}

const AddButton = connect(
  mapStateToProps,
  (dispatch: any) => {
    return {
      action: () => {
        dispatch({type: 'CLICKED'});
        dispatch({type: 'ADD'});
      }
    }
  }
)(Button);

const SubButton = connect(
  mapStateToProps,
  (dispatch: any) => {
    return {
      action: () => {
        dispatch({type: 'CLICKED'});
        dispatch({type: 'SUBSTRACT'});
      }
    }
  }
)(Button);




export default App;
