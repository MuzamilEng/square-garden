import React from 'react'
import { Icon } from '@iconify/react';

export const home_data = [
    {
        logo: 'SQUARE GARDENS',
        mrc: "MRC",
        bg: "images/main.png",
        grid_lines: "images/icon1.svg",
        icon: <Icon icon="ph:list-light" />,
        title: "CALLING ALL SQUARE GARDNERS ...",
        info: "Welcome to co-living, where you're in control",
        icon2: <Icon icon="iconamoon:arrow-down-2-duotone" />,
        link: '/home',
        rent: "Rent a room*, studio or apartment.",
        bedroom: "*Private bedrooms within shared, three-to-five-bedroom apartments, all with ensuite facilities.",
        images: [
            { src: 'images/flower1.png' },
            { src: 'images/flower2.png' },
            { src: 'images/flower3.png' },
            { src: 'images/flower4.png' },
        ],
        discover: "Discover a sustainable place to live, gather, share and experience throughout our gardens and terraces, gym, co-working and meeting spaces.",
        location: [
            {icon: <Icon icon="mdi:location-radius" />, title: "SQUARE GARDENS. MANCHESTER.", map: "(Opens Google maps)", link: "s"},
        ],
        community: "Creating a community that starts with you",
        designed: "Designed to remove all the usual headaches of shared living - one monthly fee, including all utilities and super-fast WIFI, with flexible tenancies from 6 months.",
        opening_date: "OPENING SEPTEMBER 2024",
        register: "Register Your interest",
        green: "LET’S MAKE OTHERS GREEN WITH ENVY.",
        coliving: "CO-LIVING BY DOWNING LIVING AT SQUARE GARDENS.",
        footer: [
        { 
            image: "images/icon2.svg",
            img2: "images/icon3.svg",
            info: "Downing Living is an established residential developer, for over 30 years, creating places for people to live, work and enjoy. We care about delivering excellent rental experiences – city centre locations across the UK, well connected and designed for maximum comfort and convenience. With a proven track record delivering student living by Downing Students, we’re putting our development and management expertise and experience to bringing a new generation of co-living to the heart of Manchester.",
            para: "Downing Living is part of the Downing Group",
        }
        ],
        nav_lists:[
            {title: "Design by Small Back Room", url: ""},
            {title: "Privacy & Terms", url: ""},
            {title: "©2023 Downing Living", url: ""},
        ]
    }
]