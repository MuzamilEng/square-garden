import React from 'react'
import { home_data } from '../Data'

const Footer = () => {
  return (
    <>
    {home_data?.map((item, index) => {
      return <div className="footer1" key={index}>
        {item?.footer?.map((footer, index) => {
          return <div key={index} className='footer'>
            <img src={footer?.image} className='footer_img' alt={item?.title} />
            <img src={footer?.img2} className='footer_img2' alt={item?.title} />
            <p>{footer?.info}</p>
            <span>{footer?.para}</span>
          </div>
        })}
        <div className="nav_list">
       {item?.nav_lists?.map((nav_list, index) => {
        return <p className='footer_nav' key={index}>{nav_list?.title}</p>
      })}
        </div>
      </div>
    })}
    </>
  )
}

export default Footer