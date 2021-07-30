import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Container, Form, FormGroup, Col, Row, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from 'axios';


const PetForm = (props) => {
    const history = useHistory();
    const { id } = useParams();
    
    const petList = (event) => {
        history.push("/");
    }
    const {datos, setDatos} = props;


    const [input, setInput] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skillOne: "Nothing",
        skillTwo: "Nothing",
        skillThree: "Nothing"
        
    })

    useEffect(()=>{
        if(id){
            axios.get(`/api/pet/${id}`)
            .then(response => setInput(response.data.data))
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Error editar',
                text: `No se encuentra el pet con el id: ${id} requerido`
            }))
        }
    }, [id])

    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }

    const updatePet = (event) => {
        axios.put(`/api/pet/update/${id}`, input)
        .then(response => {
            const index = datos.findIndex (res => res._id === id);
            datos.splice(index, 1, input);
            setDatos(datos);
            petList(event);
        })
        .catch(err => Swal.fire({
            icon: 'error',
            title:'Error',
            text:'Ha ocurrido un problema al actualizar los datos del animal'
        }))
    }
   

    const createPet = (event) => {
        axios.post("/api/pet/new", input)
            .then(response => {
                if(response.data&&response.data.data){
                    setDatos(datos.concat([response.data.data]));
                    petList(event);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Add a Pet Form",
                        text: response.data.message
                    })
                }
            })
            .catch(err => Swal.fire({
                icon: "error",
                title: "Loading Data not response",
                text: "An error occurred while creating a project"
            }))
    }


    const onSubmit = (event) => {
        event.preventDefault();
        if(id){
            updatePet(event);
        }
        else{
            createPet(event);
        }
    }

    const {petName, petType, petDescription, skillOne, skillTwo, skillThree} = input;

   
    return (
        <div>
            <Container>
            <Row>
                <h1>Pet Shelter <Link to={`/`} style={{float:'right', fontSize:'1.5rem'}}>Go back</Link></h1>
            </Row>
            <Row>
                <p style={{fontSize:'2.5trem'}}>{props.create ? `Know a pet needing a home?` : props.update ? `Edit ${petName}` : ""}</p>
            </Row>
            <Row>
                <Form onSubmit={onSubmit}>           
                    <Row style={{border:'2px solid black'}}>
                        <Col sm={6}>
                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="type" style={{fontWeight:'600'}}>Pet Name : </Label>
                                <Input type="text" name="petName" id="name" value={petName} onChange={onChange} style={{border: '2px solid black'}} required/>
                                {(petName.length > 0 && petName.length<4) && <p style={{color:'red', fontSize:'1.3rem'}}>El nombre es muy corto</p>}              
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="type" style={{fontWeight:'600'}}>Pet Type: </Label>
                                <Input type="text" name="petType" id="type" value={petType} onChange={onChange} style={{border: '2px solid black'}} required/>
                                {(petType.length > 0 && petType.length<3) && <p style={{color:'red', fontSize:'1.3rem'}}>El tipo es muy corto</p>}              
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="type" style={{fontWeight:'600'}}>Description : </Label>
                                <Input type="text" name="petDescription" id="type" value={petDescription} onChange={onChange} style={{border: '2px solid black'}} required/>
                                {(petDescription.length > 0 && petDescription.length<3) && <p style={{color:'red', fontSize:'1.3rem'}}>La opción debe ser más larga</p>}              
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Col xs>
                                    {props.update && <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit" >Edit Pet</Button>}
                                    {props.create && <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit" >Add Pet</Button>}
                                   
                                </Col>
                            </FormGroup>
                        </Col>

                        <Col sm={6}>
                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="skillOne" style={{fontWeight:'600'}}>Skill One</Label>
                                <Input type="text" name="skillOne" id="skillOne" value={skillOne} onChange={onChange} style={{border: '2px solid black'}}/>             
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="skillTwo" style={{fontWeight:'600'}}>Skill Two</Label>
                                <Input type="text" name="skillTwo" id="skillTwo" value={skillTwo} onChange={onChange} style={{border: '2px solid black'}}/>             
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="skillThree" style={{fontWeight:'600'}}>Skill Three</Label>
                                 <Input type="text" name="skillThree" id="skillThree" value={skillThree} onChange={onChange} style={{border: '2px solid black'}}/>            
                            </FormGroup>
                        </Col>       
                    </Row>        
                </Form>
            </Row>
        </Container>
            
        </div>
    )
}

export default PetForm;