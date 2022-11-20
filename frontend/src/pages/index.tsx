import React, { useState } from 'react';
import TextInput from '../components/form-elements/text-input';
import NumberInput from '../components/form-elements/number-input';
import Image from 'next/image';

export default function Page() {
    const [address, setAddress] = useState('');
    const [size, setSize] = useState<number | null>(null);

    const buttonIsDisabled = address === '' || size === null;

    const triggerRequest = async () => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`
        );

        const locationMatches = await response.json();

        if (locationMatches.length == 0) {
            alert('no matches');
            return;
        }

        const lat = locationMatches[0].lat;
        const lon = locationMatches[0].lon;
        window.open(`/form?lat=${lat}&lon=${lon}&size=${size}`, '_self');
    };

    return (
        <div>
            <div className='w-full min-h-screen bg-gray-300 flex-col-center'>
                <Image
                    src='/bg-map.png'
                    className='absolute top-0 right-0 z-0 object-cover w-full h-full blur-sm'
                    alt='map-of-munich'
                    width='1775'
                    height='1143'
                />
                <div className='z-10 p-6 bg-white flex flex-col items-end justify-center rounded-lg gap-y-4 w-[32rem] shadow-lg'>
                    <h1 className='w-full text-3xl font-medium text-center'>
                        Is your rent too high?
                    </h1>
                    <TextInput
                        label='Address'
                        value={address}
                        setValue={setAddress}
                    />
                    <NumberInput
                        label='Apartment Size [m2] (20 - 160)'
                        value={size}
                        setValue={setSize}
                    />
                    <button
                        className={
                            'px-3 py-1.5 font-medium text-center rounded-md bg-gray-200 ' +
                            (buttonIsDisabled
                                ? 'text-gray-500 cursor-not-allowed '
                                : 'text-gray-900 cursor-pointer')
                        }
                        onClick={buttonIsDisabled ? () => {} : triggerRequest}
                    >
                        Calculate limit
                    </button>
                </div>
            </div>
        </div>
    );
}
