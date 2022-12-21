import './App.css';
import React, { useContext,useState } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export const App = () => 
{
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const tokenUser = localStorage.getItem('token')

  const config = {
    headers: { Authorization: `${tokenUser}` }
  }; 
  const onLogout = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/logout',
            { headers: { 'accept': 'application/json' } },
            config
        )
        logout()
        navigate('/login')       
    } catch (error) {
        console.log(error.response.data.message, 'error');
    }
}

const [isHover, setIsHover] = useState(false);

const handleMouseEnter = () => {
   setIsHover(true);
};

const handleMouseLeave = () => {
   setIsHover(false);
};


const LogoutStyle = {
 
  color: isHover ? 'rgba(0,217,255,1)' : 'rgba(113,44,205,1',
  textDecorationLine: isHover ?  'underline' : 'none'
};

  return (
    <>
  <div className='flex-row bg-neutral-900'>
    <div className="">
      <header >
        <div className="bg-neutral-900 flex-row">
        <h1>Sistema de Prisioneros</h1>
        {/* <img src="https://cdn-icons-png.flaticon.com/512/5865/5865778.png" className="iconcarcel" alt="logo" /> */}
       
     
        <p>
          Bienvenido - {user.username}
        </p>
        <button   style={LogoutStyle} onClick={onLogout}   onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} >Logout</button>

        </div>       
      </header>     
    </div>
    
    <div className="App-header2">   
    <div className="flex flex-row hover:flex-wrap-reverse" >
   
      </div>
       
      <h1 className='text-center  '>Proyecto: Recuperar contraseña 😎</h1>
      


      <p className='parragoContact'>Desarrollado por:</p>
      
          <div className='contact-area'>
             {/* ---------------------------------------- */}
            <div className='contact'>
            <section className='areaContact'>            
              <div className='cajaL'>
                {/* <div className='imagenP'><img className='imagenContact' src="https://avatars.githubusercontent.com/u/74798975?s=400&u=7a3e8f1b82025fbbc753f271908c4397da5678e4&v=4" alt="Profile Image"/></div> */}
                <div className='parrafo'><aside className='letters'>
                <h1 className='tituloContact'>Adrian Chicaiza</h1>
                <p className='parragoContact'>Hola, mi nombre es Adrian Chicaiza y me gusta el Desarrollo Web</p>
              </aside>  
              
                  <span className='parragoContact'>Mi GitHub:</span>  
                  <a href='https://github.com/AdrianChicaiza'>
                  <div className='fondoicon'>
                  {/* <img className='icon' src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"/>  */}
                  </div> 
                  </a>                              
                 </div>    
            </div>              
              </section>
            </div>
            {/* ----------------- */} 
            <div className='contact'>
            <section className='areaContact'>            
              <div className='cajaL'>
                {/* <div className='imagenP'><img className='imagenContact' src="https://avatars.githubusercontent.com/u/88470677?v=4" alt="Profile Image"/></div> */}
                <div className='parrafo'><aside className='letters'>
                <h1 className='tituloContact'>Antonio Villegas</h1>
                <p className='parragoContact'>Hola, mi nombre es Antonio Villegas y me gusta el Desarrollo Web</p>
              </aside>  
              <span className='parragoContact'>Mi GitHub:</span>  
                  <a href='https://github.com/AntonioVillegas13'>
                  <div className='fondoicon'>
                  {/* <img className='icon' src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"/>  */}
                  </div> 
                  </a>  
                </div>    
                        
                </div>              
              </section>
            </div>

            {/* ---------------------------------------- */}
            <div className='contact'>
            <section className='areaContact'>            
              <div className='cajaL'>
                {/* <div className='imagenP'><img className='imagenContact' src="https://avatars.githubusercontent.com/u/105765407?v=4" alt="Profile Image"/></div> */}
                <div className='parrafo'><aside className='letters'>
                <h1 className='tituloContact'>Alexander Tupiza</h1>
                <p className='parragoContact'>Hola, mi nombre es Alexander Tupiza y me gusta el Desarrollo Web</p>
              </aside>  
              <span className='parragoContact'>Mi GitHub:</span>  
                  <a href='https://github.com/FernandoTupiza'>
                  <div className='fondoicon'>
                  {/* <img className='icon' src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"/>  */}
                  </div> 
                  </a>  
              </div>    
                        
                </div>              
              </section>
            </div>
            {/* ---------------------------------------- */}
            <div className='contact'>
            <section className='areaContact'>            
              <div className='cajaL'>
                {/* <div className='imagenP'><img className='imagenContact' src="https://avatars.githubusercontent.com/u/75056800?v=4" alt="Profile Image"/></div> */}
                <div className='parrafo'><aside className='letters'>
                <h1 className='tituloContact'>Eduardo Farinango</h1>
                <p className='parragoContact'>Hola, mi nombre es Eduardo Farinango y me gusta el Desarrollo Web</p>
              </aside>  
              <span className='parragoContact'>Mi GitHub:</span>  
                  <a href='https://github.com/EdFarinango'>
                  <div className='fondoicon'>
                  {/* <img className='icon' src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"/>  */}
                  </div> 
                  </a>  
              </div>    
                        
                </div>              
              </section>
            </div>
            {/* ---------------------------------------- */}

            {/* ---------------------------------------- */}
          </div>
     
   
    </div>
  </div>
    </>

  );
}
