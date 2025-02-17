import { useState, useEffect } from 'react'

import fullLogo from './assets/logo-full.svg'
import compactLogo from './assets/logo-compact.svg'

function HeaderLogo(){

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      if(scrolled){
        return (<img src={compactLogo} className='h-25'></img>)
      }

    return (
        <>
            <img src={fullLogo} className='h-30 object-cover'></img>
            <hr className="w-sm my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"/>
        </>
    )
}

export default HeaderLogo;