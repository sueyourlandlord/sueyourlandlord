import { get } from 'lodash';
import { useRouter } from 'next/router';
import { GERMAN_TRANSLATIONS } from '../../utils/constants';

export default function NumberInput(props: {
    label: string;
    value: number | null;
    setValue(v: number | null): void;
}) {
    function parseIntInput(v: string): number | null {
        let out = parseInt(v);
        if (isNaN(out)) {
            return null;
        }
        return out;
    }

    const router = useRouter();
    const pageIsGerman = router.query.locale === 'de';
    const getLocalizedLabel = (label: string): string => {
        if (pageIsGerman) {
            return get(GERMAN_TRANSLATIONS, label, label);
        }
        return label;
    };

    return (
        <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700'>
                {getLocalizedLabel(props.label)}
            </label>
            <div className='w-full mt-1'>
                <input
                    type='text'
                    className='block w-full px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm '
                    value={props.value == null ? '' : props.value.toString()}
                    onChange={e =>
                        props.setValue(parseIntInput(e.target.value))
                    }
                />
            </div>
        </div>
    );
}
