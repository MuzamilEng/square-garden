import React, { useEffect, useState } from 'react';
import { home_data } from '../Data';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {home_data?.map((item, index) => (
                <div key={index}>
                    <header className={`${isScrolled ? 'bg-white' : ''} w-[100vw] lg:h-[8rem] md:h-[4rem] sm:h-[4rem] h-[2.2rem] z-50 fixed top-0`}>
                        <div className="logo">
                            <h1>{item?.logo}</h1>
                            <p>{item?.mrc}</p>
                            <span className="icon">{item?.icon}</span>
                        </div>
                    </header>
                </div>
            ))}
        </div>
    );
};

export default Header;
