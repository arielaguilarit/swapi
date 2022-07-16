import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Alert,
    Container,
    Row,
    Col,
    Card,
    Pagination,
    Form,
} from "react-bootstrap";
import Peliculas from "./Peliculas";

import { isNum } from '../utils/utils';

const Personajes = (props) => {
    const [url, setUrl] = useState("https://swapi.dev/api/people");
    const [peoples, setPeoples] = useState([]);
    const [tempPeoples, setTempPeoples] = useState([]);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [item, setItem] = useState(1);
    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        getPeoples(url);
        let itemAux = url.slice(-1);
        if (isNum(itemAux)) {
            setItem(itemAux);
        } else {
            setItem(1);
        }
    }, [url]);

    const getPeoples = async (url) => {
        const response = await axios.get(url);
        setPeoples(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
    };

    const prevPag = (prev) => {
        setUrl(prev);
        setBuscar('');
    };
    const nextPag = (next) => {
        setUrl(next);
        setBuscar('');
    };

    const onChange = (e) => {
        setBuscar(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (textoBusqueda) => {
        let tableFiltrada = peoples.filter((item) => item.name
                                                        .toString()
                                                        .toLowerCase()
                                                        .includes(textoBusqueda.toString().toLowerCase()) ||
                                                    item.gender
                                                        .toString()
                                                        .toLowerCase()
                                                        .includes(textoBusqueda.toString().toLowerCase()));
        setTempPeoples(tableFiltrada);
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                <h1>Mis Personajes: </h1>
                <Form>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Buscar"
                            value={buscar}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Form>
            </div>
            <Row>

                {
                    buscar === '' ?
                        peoples.map((element, index) => {
                            return (
                                <Col md={3} className="mb-3" key={index}>
                                    <Card>
                                        <Card.Header>
                                            <h4>{element.name}</h4>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text className="m-0 text-secondary">
                                                <span className="fw-bolder">Genero :</span> {element.gender}
                                            </Card.Text>
                                            <Card.Text className="m-0 text-secondary">
                                                <span className="fw-bolder">Peliculas :</span>
                                            </Card.Text>
                                            <Peliculas films={element.films} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                        :
                        tempPeoples.length === 0 ?
                            <Alert variant="danger" onClick={() => setBuscar('')}  dismissible>
                                <Alert.Heading>No se encontraron resultados.</Alert.Heading>
                            </Alert>
                            :
                            tempPeoples.map((element, index) => {
                                return (
                                    <Col md={4} className="mb-3" key={index}>
                                        <Card>
                                            <Card.Header>
                                                <h4>{element.name}</h4>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text className="m-0 text-secondary">
                                                    <span className="fw-bolder">Genero :</span> {element.gender}
                                                </Card.Text>
                                                <Card.Text className="m-0 text-secondary">
                                                    <span className="fw-bolder">Peliculas :</span>
                                                </Card.Text>
                                                <Peliculas films={element.films} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                }
            </Row>
            <Row>
                <Col md={{ span: 2, offset: 5 }}>
                    <Pagination>
                        {/*<Pagination.First onClick={firstPag} />*/}
                        <Pagination.Prev
                            onClick={() => prevPag(prev)}
                            disabled={prev == null ? true : false}
                        />
                        <Pagination.Item active={true}>{item}</Pagination.Item>
                        <Pagination.Next
                            onClick={() => nextPag(next)}
                            disabled={next === null ? true : false}
                        />
                        {/*<Pagination.Last onClick={lastPag} />*/}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default Personajes;
