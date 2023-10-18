import React from 'react'
import { home_data } from '../Data'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

const Home = () => {
  return (
    <div>
      {home_data?.map((item, index) => {
        return <main className="main_container" key={index}>
          <img src={item?.bg} alt={item?.title} style={{ width: "1366vw" }} />
          <img src={item?.grid_lines} alt={item?.title} className='absolute top-0 left-0' style={{ width: "1366vw" }} />
          <Header />
          <h1 className='title'>{item?.title}</h1>
          <p className='info'>{item?.info}</p>
          <span className='down_arrow'>{item?.icon2}</span>
          <article className='article'>
            <h1>Rent a room<span>*</span>, studio or apartment.</h1>
           <p><span>*</span>Private bedrooms within shared, three-to-five-bedroom apartments, all with ensuite facilities.</p>
          </article>
          <div className="images_container">
            {item?.images?.map((image, index) => {
              return <img key={index} src={image?.src} alt={item?.title} />
            })}
          </div>
          <main className='discover'>
            <h1>{item?.discover}</h1>
          </main>
          <section>
              {item?.location?.map((location, index) => {
                return <div key={index} className='location'>
                  <span>{location?.icon}</span>
                  <h1>{location?.title}</h1>
                  <p>{location?.map}</p>
                  {/* <a href={location?.link}>{location?.link}</a> */}
                </div>
              })}
            </section>
          <main className='community'>
            <h1>{item?.community}</h1>
            <h2>{item?.designed}</h2>
          </main>
          <div className="banner">
            <span>{item?.opening_date}</span>
            <h1>{item?.register}</h1>
          </div>
          <div className="envey">
            <h1>{item?.green}</h1>
            <h2>{item?.coliving}</h2>
          </div>
          <Footer />
        </main>
      })}
    </div>
  )
}

export default Home