import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ShieldIcon } from '../atoms'
import { Cover } from '../organisms';

export const AuthTemplate = () => {
    return (
        <>
        
            <div className='relative '>
                <div className='md:fixed md:w-2/5 right-0 '>
                    <Cover />
                </div>
            </div>
            {/* -------------------------------------------------------------------------------- */}
            <div >
            <div className='absolute flex w-full md:w-3/5  h-screen items-center justify-center py-16 left-0'>
                <main className='max-w-md w-full h-auto px-4'>
                {/* text-center quitado del siguiente div -> */}
                    <div className=''>

                        {/* icono que aparece con la pantalla a la mitad */}
                        {/* <Link to="/" className='inline-flex md:hidden'>
                            <ShieldIcon styles='w-14 h-14 mx-auto text-cyan-500' />
                        </Link> */}
                        <Outlet />
                    </div>
                </main>
            </div>
            </div>
        
        </>
    )
}
