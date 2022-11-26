import {
    IconBuildingCommunity,
    IconChevronDown,
    IconBath,
    IconHome2,
    IconCampfire,
    IconMicrowave,
    IconWood,
} from '@tabler/icons';
import { get } from 'lodash';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { GERMAN_TRANSLATIONS } from '../../utils/constants';
import CustomTypes from '../../utils/custom-types';

const sectionStyling = {
    'building details': {
        icon: <IconBuildingCommunity />,
        headerClasses: 'text-indigo-700 hover:text-indigo-900',
    },
    bathroom: {
        icon: <IconBath />,
        headerClasses: 'text-violet-700 hover:text-violet-900',
    },
    flooring: {
        icon: <IconWood />,
        headerClasses: 'text-purple-700 hover:text-purple-900',
    },
    kitchen: {
        icon: <IconMicrowave />,
        headerClasses: 'text-fuchsia-700 hover:text-fuchsia-900',
    },
    heating: {
        icon: <IconCampfire />,
        headerClasses: 'text-pink-700 hover:text-pink-900',
    },
    balcony: {
        icon: <IconHome2 />,
        headerClasses: 'text-rose-700 hover:text-rose-900',
    },
};

export default function FormSection(props: {
    label: CustomTypes.CategoryLabel;
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(true);

    const { locale } = useRouter();

    const getLocalizedLabel = (label: string): string => {
        if (locale === 'de') {
            return get(GERMAN_TRANSLATIONS, label, label);
        }
        return label;
    };

    return (
        <div
            className={
                'border-t border-gray-300 px-3 ' +
                (collapsed ? 'py-2 ' : 'py-3 ') +
                'transition-all duration-100 '
            }
        >
            <div className='px-2'>
                <div
                    className={
                        'w-full flex-row-center py-2 ' +
                        'cursor-pointer no-selection rounded-lg ' +
                        sectionStyling[props.label].headerClasses
                    }
                    onClick={e => {
                        setCollapsed(!collapsed);
                        e.preventDefault();
                    }}
                >
                    <div>{sectionStyling[props.label].icon}</div>
                    <div className={'block mx-2 text-lg font-medium uppercase'}>
                        {getLocalizedLabel(props.label)}
                    </div>
                    <div className='flex-grow' />
                    <IconChevronDown
                        className={collapsed ? 'rotate-0 ' : 'rotate-180 '}
                    />
                </div>
                <div
                    className={
                        collapsed ? 'hidden' : 'flex flex-col gap-y-6 mb-3 mt-2'
                    }
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
}
