import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import PetList from '../components/PetList';
import PetForm from '../components/PetForm';
import Details from '../components/Details';

const Main = () => {
    const [actualizar, setActualizar] = useState(0)
    const [datos, setDatos] = useState([]);
    useEffect(()=>{
        axios.get("/api/pet")
            .then(response => setDatos(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Pets",
                text: "Error in loading the data from Pets"
            }))
    }, [actualizar])

    return (
        <Container>
            <Router>
                <Switch>
                    <Route exact path={`/`}>
                        <PetList datos={datos} setDatos={setDatos}/>
                    </Route>
                    <Route path={`/pet/update/:id`}>
                        <PetForm update={true} datos={datos} setDatos={setDatos}/>
                    </Route>
                    <Route path={`/pets/new`}>
                        <PetForm create={true} datos={datos} setDatos={setDatos}/>
                    </Route>
                    <Route path={`/pets/:id`}>
                        <Details datos={datos} setDatos={setDatos} actualizar={actualizar} setActualizar={setActualizar}/>
                    </Route> 
                </Switch>
            </Router>       
        </Container>

    );
}

export default Main;