
import { Checkbox, Row, Col, Divider, Space, Select, Radio, Form } from 'antd';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
const { Text } = Typography;


function RsvpLine({guest, isCorrectDataOptions}){

    const getBusOptions = () => {
        return guest.bus.options ? guest.bus.options.split(",") : null;
    }

    const getBusDestination = () => {
        return guest.bus.destination;
    }

    const getBusDestinatationActive = () => {
        return guest.bus.options && (guest.bus.options.includes("Vuelta-1") || guest.bus.options.includes("Vuelta-2"));
    }


    const [confirmed, setConfirmed] =useState(guest.isConfirmed);
    const [menu, setMenu] =useState(guest.menu);
    const [busOption, setBusOption] =useState(guest.bus.isUsed ? 1 : 2);
    const [busOptions, setBusOptions] =useState(getBusOptions());
    const [busDestination, setBusDestination] =useState(getBusDestination());
    const [busDestinationActive, setBusDestinationActive] =useState(getBusDestinatationActive());
    const [correctBusOptions, setCorrectBusOptions] =useState(isCorrectDataOptions);

    useEffect(() => {
        setConfirmed(guest.isConfirmed);
        setMenu(guest.menu);
        setBusOption(guest.bus.isUsed ? 1 : 2);
        setBusOptions(guest.bus.options ? guest.bus.options.split(",") : null)
        setBusDestinationActive(guest.bus.options && (guest.bus.options.includes("Vuelta (21:30)") || guest.bus.options.includes("Vuelta (23:00)")))
    }, [guest.isConfirmed, guest.menu, guest.bus.isUsed, guest.bus.options]);

    useEffect(() => {
        setCorrectBusOptions(isCorrectDataOptions)
    }, [isCorrectDataOptions])

    const changeConfirmation = () =>{
        setConfirmed (!confirmed);
        guest.isConfirmed = !confirmed;
    }

    const changeBus = (e) =>{
        setBusOption (e.target.value);
        guest.bus.isUsed = e.target.value == 1 ? true : false;
        if(!guest.bus.isUsed ){
            setBusOptions(null);
            guest.bus.destination = "";
            guest.bus.options ="";
        }
    }

    const changeBusOptions = (e) =>{
        setBusOptions(e);
        guest.bus.options = e.join(",");
    }

    const changeMenu = (e) =>{
        guest.menu = e;
    }

    const changeDestination = (e) =>{
        guest.bus.destination = e;
    }

    const printBusOptions = () =>{
        return (
            <>
            <Col xs={18} sm={7} className='p-2' style={{ textAlign: "left" }}>
                <Row>
                    <Col xs={24}>
                        <Select
                            mode='multiple'
                            onChange={changeBusOptions}
                            placeholder= "Indica una o varias opciones"
                            defaultValue={busOptions}
                            style={{
                            }}
                            status={correctBusOptions ? '' : 'error'}
                            aria-errormessage='Error'
                            options={[
                                {
                                    value: 'default',
                                    label: 'Elija uso de autobús',
                                    disabled: true
                                },
                                {
                                    value: 'Ida',
                                    label: 'Ida'
                                },
                                {
                                    value: 'Vuelta (21:30)',
                                    label: 'Vuelta (21:30)',
                                },
                                {
                                    value: 'Vuelta (23:00)',
                                    label: 'Vuelta (23:00)',
                                },
                            ]}
                        />
                    </Col>
                    <Col xs={24}>
                    {busDestinationActive ? 
                        <Select
                            placeholder= "Indica lugar de vuelta"
                            style={{
                                
                            }}
                            onChange={changeDestination}
                            defaultValue={busDestination}
                            allowClear={true}
                            options={[
                                {
                                    value: 'default',
                                    label: 'Lugar de vuelta',
                                    disabled: true
                                },
                                {
                                    value: 'Móstoles',
                                    label: 'Móstoles'
                                },
                                {
                                    value: 'Alcorcón',
                                    label: 'Alcorcón',
                                },
                                {
                                    value: 'Madrid (Rosales)',
                                    label: 'Madrid (Rosales)',
                                },
                            ]}
                        />
                        : ''}
                    </Col>
                </Row>
            </Col>
            </>
        )
    }

    return (
        <>
        <Row justify={'start'} style={{ height: "100%" }} align={'middle'}>
            <Col xs={2} sm={2} className='p-2'>
                <Checkbox checked={confirmed} onChange={changeConfirmation}></Checkbox>
            </Col>
            <Col xs={20} sm={5} className='p-2' style={{ textAlign: "left" }}>
                <Row>
                    <Col xs={3} sm={24}>
                        <Text strong>{guest.name}</Text>
                    </Col>
                    <Col>
                        <Text type="secondary">{guest.subname}</Text>
                    </Col>
                </Row>
                
            </Col>
            <Col xs ={24} sm={7} className='p-2' style={{ textAlign: "left" }}>
                <Select
                    defaultValue={menu ? menu : "default"}
                    onChange={changeMenu}
                    options={[
                        {
                            value: 'default',
                            label: 'Tipo de menú',
                            disabled: true
                        },
                        {
                            value: 'Normal',
                            label: 'Normal',
                        },
                        {
                            value: 'Vegetariano',
                            label: 'Vegetariano',
                        },
                        {
                            value: 'Vegano',
                            label: 'Vegano',
                        },
                        {
                            value: 'Celiaco',
                            label: 'Celiaco',
                        },
                    ]}
                    />
            </Col>
            <Col xs={6} sm={3} className='p-2' style={{ textAlign: "left" }}>
                <Space direction='vertical'>
                    <Text strong>Autobus: </Text>
                    <Radio.Group
                        onChange={changeBus}
                        value={busOption}
                        options={[
                            {
                                value: 1,
                                label: ( <p>Si</p>),
                            },
                            {
                                value: 2,
                                label: ( <p>No</p>),
                            },
                        ]}
                        />
                </Space>
                
            </Col>
            {(guest.bus.isUsed) ? printBusOptions() : ''}
            
        </Row>
        <Divider />
        
        </>
    )

}

export default RsvpLine;