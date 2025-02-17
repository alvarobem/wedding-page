import { useState, useEffect } from 'react'
import { Typography } from 'antd';


const { Text } = Typography;



import HeaderLogo from './HeaderLogo';

function NavBar(){

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <>
        <nav className={`fixed top-0 left-0 w-full bg-white/80 shadow-md z-50 transition-all duration-700 ${scrolled ? "p-0.2 flex-row justify-between" : "p-1 flex-col items-center text-center"}`}>
            <div className={`max-w-6xl mx-auto flex ${scrolled ? "flex-row justify-between" : "flex-col items-center"}`}>
                <HeaderLogo/>
                <ul className={`flex space-x-6 transition-all duration-700 ${scrolled ? "text-right w-full justify-end" : "justify-center"}`}>
                    <li><a href="#" className="hover:text-gray-600">Inicio</a></li>
                    <li><a href="#" className="hover:text-gray-600">Detalles</a></li>
                    <li><a href="#" className="hover:text-gray-600">Galería</a></li>
                    <li><a href="#" className="hover:text-gray-600">Contacto</a></li>
                </ul>
            </div>
        </nav>     
        </>
    )
}

export default NavBar;