import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";

const AboutPage = () => {
  const [settings, setSettings] = useState({});

   
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ margin: '50px auto 0 auto', textAlign: 'center' }}>
        <img
                src="./iconNoBG.png"
                alt="Rizz Up Icon"
                style={{ height: "100px" }}
              />
        <h1 className='aboutHeader aboutStatement '> Elevate connections and coaching with your insights! Join in - where your wisdom sparks change. </h1>

        <p className='aboutStatement aboutText'> RizzUp is the most powerful self-help community for men. Based upon the belief that every man must be the best version of himself to inspire others and provide guidance for future generations. Since 2023, RizzUp has helped millions of men improve their lives through learning, brotherhood,
          and the search for truth - within ourselves and the world. Through RizzUp, we make true friends, enhance ourselves, and have a positive impact on society. 
        </p>
        


      </div>

    </div>



  );
};

export default AboutPage;
