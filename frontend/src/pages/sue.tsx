import React from 'react';
import Image from 'next/image';

export default function Page() {
    return (
        <div className='w-full min-h-screen bg-gray-100 flex-col-center'>
            <div className='z-10 bg-white flex flex-col-center rounded-lg gap-y-0 w-[40rem] shadow-lg overflow-hidden'>
                <Image
                    src='/alex.jpg'
                    alt='alex'
                    width='1920'
                    height='1080'
                    className='w-full'
                />
                <h1 className='w-full pt-4 text-3xl text-center font-regular'>
                    You Can{' '}
                    <span className='font-bold'>Sue Your Landlord!</span>
                </h1>
                <p className='px-4 pt-3 pb-2'>
                    Get in touch with a local tenant association like{' '}
                    <span className='font-medium'>
                        Mieterverein Muenchen e.V.
                    </span>{' '}
                    (see{' '}
                    <a
                        href='https://www.mieterverein-muenchen.de/kontakt/beratungstermin'
                        className='font-medium text-blue-600 underline'
                        target='_self'
                    >
                        https://www.mieterverein-muenchen.de/kontakt/beratungstermin
                    </a>
                    )
                </p>
                <p className='px-4 pt-3 pb-4 italic'>
                    Are you a law firm?{' '}
                    <a
                        href='https://github.com/sueyourlandlord'
                        className='font-medium text-blue-600 underline'
                        target='_self'
                    >
                        Sponsor us!
                    </a>
                </p>
            </div>
        </div>
    );
}
