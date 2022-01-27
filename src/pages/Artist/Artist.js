import React, { useState , useEffect,useDispatch,useCallback } from "react"
import './Artist.scss'
import '../../Project.scss'
import Table from 'react-bootstrap/Table'
import { Row,Col,Modal,Button,Form } from "react-bootstrap";
import {BsFillPencilFill, BsTrashFill} from 'react-icons/bs'
import { Redirect } from "react-router";
import axios from "axios";
import {AiFillCheckCircle} from 'react-icons/all'
import e from "cors";

const Artists = () =>{

    //const go                     = useDispatch();
    const [showModal,setShowModal] = useState(false)
    const [dataCliente,setDataCliente] = useState([]);
    const [stateOrder,setStateOrder] = useState({key:'nombre',order:'desc'});
    const [f,setF] = useState({
        ci:'',
        nombre:''
    });
    //onst [tabOption,setTabOption] = useState('1')
    //const [showModal,setShowModal] = useState(false);

    const getCliente = useCallback( () =>  {
        axios.get('http://127.0.0.1/demoapi/api/cliente/lista',{})
        .then((response)=>{
            console.log(response.data.Data.Data)
            setDataCliente(response.data.Data.Data)
        }).catch((e)=>{
            console.log(e)
        });
        
    },[])
    const handleChange = (e,key)=>{
        e.preventDefault();
        let data = f;
        data[key] = e.target.value

        setF(data)
        console.log(f)
    }
    function ordenarAsc(e, p_key,orden='asc') {
        e.preventDefault()
        let data = dataCliente;
        data.sort((a, b) =>{
            //console.log(b);
            var x = a[p_key],
            y = b[p_key];

            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }

            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
           //return a[p_key] > b[p_key];
        });
        
        setDataCliente(data);
        console.log(dataCliente);
     }
    const registroCliente = () => {
        axios.post('http://127.0.0.1/demoapi/api/cliente/registro',f)
        .then((response)=>{
            let data = response.data.Data;
            console.log(data.Succcess)
            if(data.Success){
                setShowModal(false)
                getCliente();
                console.log(data.Menssage,'Bien')
            }else{
                console.log(data.Menssage,'Mal')
            }
            //setDataCliente(response.data.Data.Data)
        }).catch((e)=>{
            console.log(e)
        });
        //console.log(f,'Registrado');
    }
    const desHabilitar = (elemto) =>{
        axios.post('http://127.0.0.1/demoapi/api/cliente/deshabilitar',elemto)
        .then((response)=>{
            let data = response.data.Data;
            console.log(data)
            if(data.Success){
                getCliente();
                console.log(data.Menssage,'Bien')
            }else{
                console.log(data.Menssage,'Mal')
            }
            //setDataCliente(response.data.Data.Data)
        }).catch((e)=>{
            console.log(e)
        });
    }
    const habilitar = (elemto) =>{
        axios.post('http://127.0.0.1/demoapi/api/cliente/habilitar',elemto)
        .then((response)=>{
            let data = response.data.Data;
            console.log(data.Success)
            if(data.Success){
                getCliente();
                console.log(data.Menssage,'Bien')
            }else{
                console.log(data.Menssage,'Mal')
            }
            //setDataCliente(response.data.Data.Data)
        }).catch((e)=>{
            console.log(e)
        });
    }
    const ModalCheckTrack = props =>{
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Track Checks
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row className="col-12">
                        <Col className="col-3">
                            <input type="text" onChange={(e)=>handleChange(e,'ci')} placeholder="CI"></input>
                        </Col>
                        <Col className="col-3">
                            <input type="text" onChange={(e)=>handleChange(e,'nombre')} placeholder="Nombre" ></input>
                        </Col>
                        <Col className="col-3">
                            <input type="text" onChange={(e)=>handleChange(e,'apellidos')} placeholder="Apellidos"></input>
                        </Col>
                        
                    </Row>
                    <Row className="col-12">
                        <Col className="col-3">
                            <input type="text" onChange={(e)=>handleChange(e,'Nacionalidad')} placeholder="Nacionalidad"></input>
                        </Col>
                        <Col className="col-3">
                            <input type="text" onChange={(e)=>handleChange(e,'edad')} placeholder="Edad"></input>
                        </Col>
                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>registroCliente()}>Guardar</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    

    useEffect(()=>{
        
        if(dataCliente.length==0){
            console.log(dataCliente.length)
            getCliente();
        }else{
            let data = dataCliente;
            data.sort((a, b) =>{
                //console.log(b);
                var x = a[stateOrder.key],
                y = b[stateOrder.key];

                if (stateOrder.order  === 'asc') {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }

                if (stateOrder.order === 'desc') {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
                //return a[p_key] > b[p_key];
            });
        
            setDataCliente(data);
        }
        
        console.log('inicio')
    },[dataCliente,getCliente,stateOrder])
    return(
        <div className="profile-content">
            <Row className="section-nav">
                <Col>
                    <h1>Artist Administrator</h1>
                </Col>  
            </Row>

            <Row>
                <Col className='col-10'>
                    <input type="text" placeholder="Search"/>

                </Col>
                <Col className='col-2' style={{justifyContent:'end'}}>
                    <div className="btn-circule" onClick={()=>{setShowModal(true)}}>Add</div>
                </Col>
                
            </Row>

            <Row className="col-12">
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        
                        <th onClick={(e)=>setStateOrder({key:'ci',order:'desc'})}>CI</th>
                        <th onClick={(e)=>setStateOrder({key:'nombre',order:'desc'})}>Nombre</th>
                        <th onClick={(e)=>setStateOrder({key:'apellidos',order:'desc'})}>Apellidos</th>
                        <th onClick={(e)=>setStateOrder({key:'edad',order:'desc'})}>Edad</th>
                        <th>Nacionalidad</th>
                        <th>Estado</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCliente.map((e)=>{
                        return(
                            <tr>

                                <td>{e.ci}</td>
                                <td>{e.nombre}</td>
                                <td>{e.apellidos}</td>
                                <td>{e.edad}</td>
                                <td>{e.Nacionalidad}</td>
                                <td style={e.estado==0?{color:'red'}:{color:'green'}}>{e.estado==0?"deshabilitado":"habilitado"}</td>
                               <th>{e.estado==0?<BsFillPencilFill onClick={()=>habilitar(e)} />:  <BsTrashFill onClick={()=>desHabilitar(e)}/>}</th>
                            </tr>
                        )
                    })}
                </tbody>
                </Table>
            </Row>
            <ModalCheckTrack
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </div>
    );

}

export default Artists