import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../utils/style/Bootstrap.scss";
import { useHistory, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

const DetailPage = (props) => {
    let { id } = useParams();
    let history = useHistory();
    const [active, setActive] = useState(true);
    let [tab, setTab] = useState(0);
    let [anim, setAnim] = useState(true);

    let product = props.shoes.filter((item) => item.id == id)[0]; // Its been hard!!!!!!!!
    // let product = props.shoes.find(item => item.id == id) // this one is another answer .

    useEffect(() => {
        let count = setTimeout(() => {
            setActive(false);
        }, 4000);
        return () => {
            clearTimeout(count);
        };
    },[alert]);

    return (
        <div className="container">

            {active ? (
                <div className="alert">
                    <p>Stock going fast!! hurry up to get that discount!</p>
                    <div className="grow"></div>
                </div>
            ) : null}

            <div className="row">
                <div className="col-md-6">
                    <img src={product.img}  width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>A${product.price}</p>
                    <button
                        className="btn btn-danger mr-2"
                        onClick={() => {
                            props.dispatch({
                                type: "add",
                                payload: { id: product.id, name: product.title, quan: product.quan },
                            });
                            history.push("/cart");
                        }}
                    >
                        Add to orer
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        Go Back
                    </button>

                    <Nav
                        className="mt-5"
                        variant="tabs"
                        defaultActiveKey="link-1"
                    >
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-1"
                                onClick={() => {
                                    setAnim(false);
                                    setTab(0);
                                }}
                            >
                                Description
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="link-2"
                                onClick={() => {
                                    setAnim(false);
                                    setTab(1);
                                }}
                            >
                                Delivery
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <CSSTransition in={anim} classNames="wow" timeout={500}>
                        <Tabs tab={tab} setAnim={setAnim} product={product}/>
                    </CSSTransition>
                </div>
            </div>
        </div>
    );
};

const Tabs = ({ tab, setAnim, product }) => {
    useEffect(() => {
        setAnim(true);
    });

    if (tab === 0) {
        return <div className="p-5" dangerouslySetInnerHTML={{__html: product.details}}></div>;
    } else if (tab === 1) {
        return <div className="p-5">
            <p>- 100% satisfaction guaranteed (28-day return service)<br/>
            - Free standard delivery on orders over A$150<br/>
            - Free returns<br/>
            - Afterpay available in-store and online<br/>
            - Online orders paid using Afterpay and PayPal must be sent back to the warehouse and cannot be exchanged in-store</p>
        </div>;
    }
};

const Redux = (state) => {
    return {
        state: state.reducer,
        alert: state.reducer2
    };
};

export default connect(Redux)(DetailPage);
