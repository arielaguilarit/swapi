import React, { useEffect, useState } from "react";
import axios from "axios";
import {Placeholder, Card } from 'react-bootstrap'
function Peliculas({ films }) {

    const [loading, setLoading] = useState(true);
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        const getAllData = async (films) => {
            return Promise.all(films.map(getTitleFilm))
        }
        getAllData(films)
            .then((data) => {
            setPeliculas(data);
            setLoading(false);
        });
        setLoading(true);
    },[films]);
    
    const getTitleFilm = async  (URL) => {
        const response = await axios.get(URL);
        return response.data.title;
    }

    return (
        <>
            {
            loading === true ? 
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> 
                    <Placeholder xs={4} /> 
                    <Placeholder xs={4} />
                    <Placeholder xs={6} /> 
                    <Placeholder xs={8} />
                </Placeholder> 
              : 
                <ol>
                    {
                        peliculas.map((el, i) => {
                            return <li key={el}>{el}</li>;
                        })
                    }
                </ol>
            }
        </>
    );
}

export default Peliculas;
