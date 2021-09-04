import React from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import { CgMathPlus, CgMathMinus, CgTrash } from "react-icons/cg";

const Cart = (props) => {
    return (
        <div>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Change</th>
              <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {props.state.map(item =>
            <tr>
              <td>{item.name}</td>
              <td>{item.quan}</td>
              <td>
                <button onClick={()=>{ props.dispatch({type: 'plus', data: item.id }) }}> <CgMathPlus/></button>
                <button onClick={()=>{ props.dispatch({type: 'minus', data: item.id }) }}> <CgMathMinus/> </button>
              </td>
              <td>
                <button onClick={()=>{ props.dispatch({type: 'remove', data: item.id }) }}> <CgTrash/> </button>
              </td>
            </tr>
              )
            }
            </tbody>
          </Table>

      {props.alert === true
      ?<div className="alert">
      <p>GET DISCOUNT 20% OFF NOW! </p>
      <button onClick={ ()=>{ props.dispatch({type : 'close'}) }}>x</button></div> : null
      }
       

        </div>
    );
};

function Redux(state){
    return {
      state : state.reducer,
      alert : state.reducer2

    }
  }
  
export default connect(Redux)(Cart);