import { IconAlertTriangle, IconArrowBackUp } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ShowTotalSum(props: { totalSum: number | null }) {
    const { locale } = useRouter();

    return (
        <div className='flex flex-col w-full p-4 border-b border-gray-300 gap-y-2'>
            <Link href='/'>
                <div className='px-1 py-0.5 text-gray-700 bg-gray-200 rounded inline-flex flex-row items-center justify-center gap-x-1.5'>
                    <IconArrowBackUp className='w-4 h-4' />
                    <div>
                        {locale === 'de' ? 'Adresse ändern' : 'Change address'}
                    </div>
                </div>
            </Link>
            <span className='flex text-lg font-medium text-gray-800'>
                {locale === 'de'
                    ? 'Maximal erlaubte Kaltmiete (Schätzung):'
                    : 'Limit of Allowed Rent (Estimate):'}
            </span>
            <span className='w-full h-12 font-medium flex-row-center'>
                {props.totalSum !== null && (
                    <div className='px-3 py-2 text-4xl rounded-lg text-emerald-800 bg-emerald-300'>
                        {props.totalSum.toFixed(2)} €
                    </div>
                )}
                {props.totalSum === null && (
                    <div className='flex-row-center gap-x-1.5 text-amber-600'>
                        <IconAlertTriangle className='w-6 h-6' />
                        <div>
                            {locale === 'de'
                                ? 'Bitte Größe eingeben'
                                : 'Please enter size!'}
                        </div>
                    </div>
                )}
            </span>
        </div>
    );
}
