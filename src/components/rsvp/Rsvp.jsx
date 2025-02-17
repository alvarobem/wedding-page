import { Button, Row, Col, Form, Typography, Divider, Popover, Modal, Collapse, Alert} from 'antd';
const { Text, Paragraph } = Typography;
import RsvpLine from './RsvpLine';
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

import { useState, useEffect } from 'react';



let lambdaUri = 'https://l6vgfr252sf7ybi7tgqor34ipa0ftbnm.lambda-url.eu-north-1.on.aws/'






function Rsvp(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [guests, setGuests] = useState([])
    const [isBusOptionsCorrect, setIsBusOptionsCorrect] = useState(true)
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMesage] = useState('');

    

    useEffect(()=> {
        let data = {query: 1}
        axios.post(lambdaUri, data)
        .then(res => {
            console.log(res);
            setGuests(res.data.guests);
        })
    }, [])

    const handleCloseAlert = () => {
        setErrorVisible(false)
    }

    const busPopOverContent = (
        <Paragraph>
            El lugar de recogida para la ida a la finca será en XXXXX
        </Paragraph>
    )

    const openModal = () => {
        setErrorVisible(false)
        setIsBusOptionsCorrect(true);

        let usedNotCorrect = guests.filter(g => g.bus.isUsed && !g.bus.options).length;  


        if( usedNotCorrect > 0){
            setIsBusOptionsCorrect(false);
            let message = 'Si tienes seleccionado el uso de autobús, debes seleccionar algun viaje' ;
            setErrorMesage(message)
            setErrorVisible(true)
        } else {
            setIsModalOpen(true);
        }
        

        
    }

    const cancelModal = () => {
        setIsModalOpen(false);
    }

    const saveRsvp = () =>{

        setLoading(true);

        let data = {_id:1, guests: guests}
        console.log(data)
        axios.post(lambdaUri, data)
            .then(res => {
                console.log(res);
                setIsModalOpen(false); 
                setLoading(false);     
                setGuests(guests)  
            })

        console.log(guests);
        

    }


    let confirmationData = () => {
        return guests.map(g => {return {key: g.id, label: `${g.name} ${g.subname}`} })
    }

    const confirmation = (
        <Text>estamos deseando contar con vosotros en este día tan especial. Como queremso que todo esté a 
            tu gusto, necesitamos que además de confirmarnos vuestra asistencia nos faciliteis algunos datos extra
        </Text>
    )
    return (
        <>

            
            <h1 >{guests.map(g => g.name).join(" y ")} </h1> {confirmation}

            

            <Row justify={'middle'} style={{ height: "4em" }} align={'middle'}>
                <Col span={3}>
                    <Text strong>Confirmado</Text> 
                
                </Col>
                <Col span={4} >
                    <Text strong>Invitado</Text> 
                </Col>
                <Col span={7} style={{ textAlign: "left" }}>
                    <Text strong>Opción de Menú</Text> 
                </Col>
                <Col span={8} style={{ textAlign: "left" }}>
                    <Text strong>Autobus </Text> 
                    <Popover content={busPopOverContent} title="¿Cómo funcionarán los autobuses?" trigger="hover">
                        <InfoCircleOutlined />
                    </Popover>
                </Col>
            </Row>
            <Divider style={{marginTop: "0px", marginBottom: "2em"}}/>
            <Form
                name="basic"
                onFinish={openModal}
                initialValues={{guests}}
                autoComplete="off"
            >
                
                {guests.map(guest => {
                    return (       
                        <Form.Item key={guest.id} name={`name-${guest.id}`}>
                            <RsvpLine guest={guest} isCorrectDataOptions={isBusOptionsCorrect} />
                        </Form.Item>
                )})}

                { errorVisible && (
                    <Alert
                        message={errorMessage}
                        type="error"
                        closable
                        afterClose={handleCloseAlert}
                        
                    />
                )}
                

                <br></br>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                    </Form.Item>
            </Form>

            <Modal title="Confirma los datos" open={isModalOpen} onOk={saveRsvp} 
                onCancel={cancelModal} 
                cancelText="Cancelar"
                width={ 950 }
                confirmLoading = {loading}
                >
                    <Text> Se van a guardar los siguientes datos, ten en cuenta que podrás actualizaros siempre que quieras.</Text>
                    <br></br>
                    <Collapse
                        items={confirmationData()}
                        />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
            </Modal>
        
        </>
    )

}

export default Rsvp;