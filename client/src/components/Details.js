import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { Container, Card, Row, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const Details = (props) => {
    const [detail, setDetail] = useState([])
    //const {datos, setDatos} = props;
    const {id} = useParams()
    useEffect(()=>{
        axios.get(`/api/pet/${id}`)
            .then(response => setDetail(response.data.data))
            .catch(err => Swal.fire({
                icon: 'error',
                tittle: 'Loading error pet data',
                text: 'Loading the data pets'
            }))
    },[id])

    const deletePet = (event) => {

    }

    return (
        <Container>
        <Row>
            <h1>Pet Shelter <Link to={`/`} style={{float:'right', fontSize:'1.5rem'}}>back to home</Link></h1>
        </Row>
        <Row>
            <h1 style={{fontSize:'2.5trem'}}>Details about: {detail.petName}<Button style={{marginLeft:'20rem', color:'white'}} color="danger"  onClick={(event)=> deletePet(event, id)}>Adopt{detail.petName}</Button></h1>
        </Row>
        <Row>
            <Card style={{border: '2px solid black'}}>
                <Row>
                    <p><b>Pet Type: </b>{detail.petType}</p>
                </Row>
                <Row>
                    <p><b>Pet Description: </b>{detail.petDescription}</p>
                </Row>
                <Row>
                    <p><b>Skill One : </b>{detail.skillOne}</p>
                </Row>
                <Row>
                    <p><b>Skill Two: </b>{detail.skillTwo}</p>
                </Row>
                <Row>
                    <p><b>Skill Three: </b>{detail.skillThree}</p>
                </Row>
                <Row>
                    <p><Button>Like {detail.petName}</Button> {detail.likes} like(s)</p>
                </Row>
            </Card>     
        </Row>
    </Container>
    )
}

export default Details