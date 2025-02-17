import { useEffect, useState } from "react";
import TimeBox from "./TimeBox";
import { Col, Row } from "antd";


function Countdown (){

    const deadline = new Date('02/28/2026 12:00:00');

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    function calculateTimeLeft() {
        const currentDate = new Date();
        const diff = deadline.getTime() - currentDate.getTime();

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(intervalId); // Limpieza del intervalo
    }, []); // No dependemos de deadline porque es constante


    return (
        <>
        {timeLeft.days >= 0 &&(<>
            <div className=''>
                <div className="">
                    <h1 className="">Solo quedan:</h1>
                    <Row className="" justify='center'>
                        <TimeBox label="Dias" value={timeLeft.days} />
                        <TimeBox label="Horas" value={timeLeft.hours} />
                        <TimeBox label="Minutos" value={timeLeft.minutes} />
                        <TimeBox label="Segundos" value={timeLeft.seconds} />
                    </Row>
                </div>
            </div>
            </>)}
        
        </>
    )

}

export default Countdown;