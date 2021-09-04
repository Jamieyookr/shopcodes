import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Carousel } from 'react-bootstrap';
import data from './api/data.json';
import { useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import DetailPage from './DetailPage';
import axios from 'axios';
import Cart from './Cart';
import  './style1.scss'
import { connect } from 'react-redux';
import { CgShoppingCart } from "react-icons/cg";

function App(props) {
  const [shoes, setShoes] = useState(data)
  const [number, setNumber] = useState(2)
  const [btnactive, setBtnactive] = useState(true)

  const button = () => {
    (axios.get(`https://jamieyookr.github.io/data/data${number}.json`)
    .then((result)=>{   setShoes([...shoes, ...result.data ])   })
    .catch(()=>{ <p>"Loading"</p> }));
    // setNumber(number+1);
    // if (number > 3) {
    //   return setBtnactive ( false)
    // }
    number > 3 ? setBtnactive (false) : setNumber(number+1);
  }

 
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href=""><img src="logo.png" style={{width:"200px"}}/></Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="#home"><Link to="/">Home</Link></Nav.Link>
          <Nav.Link href="#cart"><Link to="/cart"><CgShoppingCart/><span style={{color:"red"}}>{props.state.length}</span> Cart</Link></Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      
      <Route exact path="/"> 
        <Carousel >
          <Carousel.Item interval={1500}>
            <Link to="/detail/1">
            <img
              className="d-block w-100"
              src="1.jpg"
              alt="First slide"
            />
            </Link>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <Link to="/detail/2"> 
            <img
              className="d-block w-100"
              src="2.jpg"
              alt="Second slide"
            />
            </Link>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
          <Link to="/detail/3">
            <img
              className="d-block w-100"
              src="3.jpg"
              alt="Third slide"
            />
            </Link>
          </Carousel.Item>
        </Carousel>
        <div className="container">
          <div className="row">
            {shoes.map(item =><Card item={item}/>)}
          </div>
        </div>

        {btnactive ? <button className="btn hbtn btn-primary" onClick={ button }>Load more shoes...</button> : <button className="btn hbtn btn-primary" disabled>No more left...</button>}

      </Route> 

      <Route path="/detail/:id"> 
        <DetailPage shoes={shoes}/>
      </Route> 

      <Route path="/cart">
        <Cart/>
    </Route>

    </div>
  );
}



const Card = ({item}) => {
  let history = useHistory();
  return (
    
      <div className="col-md-4" onClick={ ()=>{ history.push('/detail/' + item.id) } }>
              <img src={item.img}  width="100%" />
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <p>A${item.price}</p>
            </div>
    
  );
};

const Redux = (state) => {
  return {
      state: state.reducer
  };
};

export default connect(Redux)(App);




