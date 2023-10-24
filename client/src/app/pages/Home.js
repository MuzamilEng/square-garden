import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { useGlobalContext } from '../UserContext/UserContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { content, handleresult, setContentdetails } = useGlobalContext();
  const navigate = useNavigate();
  // console.log(content, 'content');
  const handleNavigate = (e)=> {
    e.preventDefault();
    setContentdetails(content[0]);
    navigate(`/edit/${content[0]?._id}`);
    console.log(content[0], "content[]0");
  }
  useEffect(() => {
  }, [handleresult]);
  return (
    <div>
      {content?.map((item, index) => {
        return <main style={{width: "1366vw"}} className="main_container" key={index}>
          <img src={item?.headerImage} alt={item?.title} style={{ width: "1366vw", height: '56.22254758418741vw' }} />
          <img src={item?.grid_lines} alt={item?.title} className='absolute top-0 left-0' style={{ width: "1366vw" }} />
          <Header />
          <h1 className='title'>{item?.headerTitle}</h1>
          <p className='info'>{item?.headerText}</p>
          <span className='down_arrow'><Icon icon="iconamoon:arrow-down-2-duotone" /></span>
          <button onClick={handleNavigate} type='submit' className='p-2 border-2 border-blue-700 cursor-pointer rounded-md bg-blue-300 '>Edit Content</button>
          <article className='article'>
            {/* <h1>Rent a room<span>*</span>, studio or apartment.</h1> */}
            <h1>{item?.rentRoom}</h1>
           <p><span>*</span>{item?.privateRoom}</p>
          </article>
          <div className="images_container">
          <img src={item?.mainImage1} alt={item?.title} />
          <img src={item?.mainImage2} alt={item?.title} />
          <img src={item?.mainImage3} alt={item?.title} />
          <img src={item?.mainImage4} alt={item?.title} />

          </div>
          <main className='discover'>
            <h1>{item?.mainDescription}</h1>
          </main>
          <section>
                <div className='location'>
                  <span><Icon icon="mdi:location-radius" /></span>
                  <h1>{item?.mainLocation}</h1>
                  <p>(Opens Google maps)</p>
                </div>
            </section>
          <main className='community'>
            <h1>{item?.mainCommunity}</h1>
            <h2>{item?.mainPara}</h2>
          </main>
          <div className="banner">
            <span>{item?.bannerText}</span>
            <h1>{item?.bannerButton}</h1>
          </div>
          <div className="envey">
            <h1>{item?.sectionTitle}</h1>
            <h2>{item?.sectionText}</h2>
          </div>
          <Footer footerDescription={item?.footerDescription} footerText={item?.footerText} footerLogoImage={item?.footerLogoImage}/>
        </main>
      })}
    </div>
  )
}

export default Home