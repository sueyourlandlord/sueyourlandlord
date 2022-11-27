import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const pageIsGerman = router.query.locale === 'de';

    return (
        <div className='w-full min-h-screen bg-gray-100 flex-col-center'>
            <div className='z-10 bg-white flex flex-col-center rounded-lg gap-y-0 w-[44rem] shadow-lg overflow-hidden'>
                <Image
                    src='/alex.jpg'
                    alt='alex'
                    width='1920'
                    height='1080'
                    className='w-full'
                />
                <h1 className='w-full pt-4 my-3 text-3xl text-center font-regular'>
                    {pageIsGerman && (
                        <>
                            Sie können Ihre{' '}
                            <span className='font-bold'>
                                Vermieter:innen verklagen!
                            </span>
                        </>
                    )}
                    {!pageIsGerman && (
                        <>
                            You Can{' '}
                            <span className='font-bold'>
                                Sue Your Landlord!
                            </span>
                        </>
                    )}
                </h1>
                <p className='px-4 pt-3 pb-2'>
                    {pageIsGerman && (
                        <>
                            Kontaktieren Sie Ihre örtliche
                            Mieter:innen&shy;vereini&shy;gung wie z.B. den{' '}
                            <span className='font-medium'>
                                Mieter&shy;verein Muen&shy;chen e.V.
                            </span>{' '}
                            (siehe{' '}
                            <a
                                href='https://www.mieterverein-muenchen.de/kontakt/beratungstermin'
                                className='font-medium text-blue-600 underline break-all'
                                target='_self'
                            >
                                https://www.mieterverein-muenchen.de/kontakt/beratungstermin
                            </a>
                            )
                        </>
                    )}
                    {!pageIsGerman && (
                        <>
                            Get in touch with a local tenant association like{' '}
                            <span className='font-medium'>
                                Mieter&shy;verein Muen&shy;chen e.V.
                            </span>{' '}
                            (see{' '}
                            <a
                                href='https://www.mieterverein-muenchen.de/kontakt/beratungstermin'
                                className='font-medium text-blue-600 underline break-all'
                                target='_self'
                            >
                                https://www.mieterverein-muenchen.de/kontakt/beratungstermin
                            </a>
                            )
                        </>
                    )}
                </p>
                <p className='px-4 pt-3 pb-4 italic'>
                    {pageIsGerman && (
                        <>
                            Sie sind Teil einer Mietrechtskanzlei?{' '}
                            <a
                                href='https://github.com/sueyourlandlord'
                                className='font-medium text-blue-600 underline'
                                target='_self'
                            >
                                Unterstützen Sie uns!
                            </a>
                        </>
                    )}
                    {!pageIsGerman && (
                        <>
                            Are you a law firm?{' '}
                            <a
                                href='https://github.com/sueyourlandlord'
                                className='font-medium text-blue-600 underline'
                                target='_self'
                            >
                                Support us!
                            </a>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
