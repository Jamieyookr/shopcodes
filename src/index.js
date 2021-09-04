import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';

let initialState = [];

function reducer(state = initialState, action){
  if (action.type === "add") {

    let where = state.findIndex( a=> a.id === action.payload.id );
    
    if ( where >= 0 ){
      console.log(where)
      let copy = [...state];
      copy.map(a => a.id === action.payload.id ? {...a, quan:a.quan++}:a)
      return copy

    } else {
      let copy = [...state];
      copy.push(action.payload)
      return copy
    }

  } else if (action.type === 'plus') {
    
    let copy = [...state];
    copy.map(item => item.id === action.data ? {...item, quan:item.quan++}:item)
    return copy

  } else if (action.type === 'minus'){

    let copy = [...state];

    copy.map(a => (a.id === action.data) & (a.quan > 1) ? {...a, quan:a.quan--}:a)
    console.log()

    // if(deep < 0){
    //   return copy
    // } else {
      
    // }

    return copy

  } else if (action.type === 'remove'){
    let copy = [...state];
    const result = copy.filter(a => a.id !== action.data)
    console.log(result)
    return result

  } else {
    return state
  }
}

let initialState2 = true;

function reducer2(state = initialState2, action){
  if (action.type === 'close'){
    return false
  } else {
    return state
  }
}

let store = createStore( combineReducers({reducer, reducer2}) );

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App /> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
