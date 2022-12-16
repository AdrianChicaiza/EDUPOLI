//  import React from 'react';
//  import ReactDOM from 'react-dom/client';
//  import { BrowserRouter, Routes, Route } from 'react-router-dom';
//  import './index.css';
//  import { Login, App } from './pages';
//  import { AuthTemplate } from './components';
// import { Registro } from './pages/app/Registro';
// import { ConfirmarContra } from './pages/app/ConfirmarContra';
// import { ConfirmarCorreo } from './pages/app/ConfirmarCorreo';
// import { AuthProvider } from './contexts';
// import { PublicRoute } from './routes/PublicRoute';
// import { PrivateRoute } from './routes/PrivateRoute';



//  const root = ReactDOM.createRoot(document.getElementById('root'));
//  root.render(
//    <React.StrictMode>
//      <BrowserRouter>
//      <AuthProvider>
//             <Routes>
//                 <Route path='login/*' element={
//                     <PublicRoute>
//                         <Routes>
//                             <Route element={<AuthTemplate />}>
//                                 <Route path='/*' element={<Login />} />
//                                 <Route path='/registro' element={<Registro />} />
//                             </Route>
//                         </Routes>
//                     </PublicRoute>
//                 } />

                

//                 <Route path='/*' element={
//                     <PrivateRoute>
//                          <Routes>
//                          <Route index path='/' element={<App />} /> 
//                         </Routes>
//                     </PrivateRoute>
//                 } />
//             </Routes>
//         </AuthProvider >
//      </BrowserRouter>
//    </React.StrictMode>
//  );

 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import { BrowserRouter} from 'react-router-dom';
 import './index.css';
 import { AppRouter } from './routes/AppRouter';

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
     <BrowserRouter>
       <AppRouter/>
     </BrowserRouter>
   </React.StrictMode>
 );


