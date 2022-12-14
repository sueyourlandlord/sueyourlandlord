import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CustomTypes from '../../utils/custom-types';
import FormSectionMandatory from '../../components/form-sections/form-section-mandatory';
import FormSectionBuildingDetails from '../../components/form-sections/form-section-building-details';
import FormSectionBathroom from '../../components/form-sections/form-section-bathroom';
import FormSectionFlooring from '../../components/form-sections/form-section-flooring';
import FormSectionKitchen from '../../components/form-sections/form-section-kitchen';
import FormSectionHeating from '../../components/form-sections/form-section-heating';
import FormSectionBalcony from '../../components/form-sections/form-section-balcony';
import ShowTotalSum from '../../components/form-elements/show-total-sum';
import dynamic from 'next/dynamic';
import selectRentZone from '../../utils/select-rent-zone';
import { filter, defaultsDeep, get } from 'lodash';
import {
    RENT_AGE_SIZE,
    DEFAULT_SELECTION,
    GERMAN_TRANSLATIONS,
} from '../../utils/constants';
import Link from 'next/link';
import { VARIATION_MAXIMUM } from '../../utils/constants';

const MapWithNoSSR = dynamic(() => import('../../components/map/map-view'), {
    ssr: false,
});

export async function getStaticPaths() {
    return {
        paths: [{ params: { locale: 'de' } }, { params: { locale: 'en' } }],
        fallback: false,
    };
}

export async function getStaticProps() {
    return {
        props: {},
    };
}

export default function Page() {
    const [userSelection, setUserSelection] =
        useState<CustomTypes.userSelection>(DEFAULT_SELECTION);

    const [totalSum, setTotalSum] = useState<number | null>(null);
    const [zoneNumber, setZoneNumber] = useState<string>('0');
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
        null
    );

    const router = useRouter();
    const pageIsGerman = router.query.locale === 'de';
    const getLocalizedLabel = (label: string): string => {
        if (pageIsGerman) {
            return get(GERMAN_TRANSLATIONS, label, label);
        }
        return label;
    };

    useEffect(() => {
        if (
            typeof router.query.lat === 'string' &&
            typeof router.query.lon === 'string' &&
            typeof router.query.size === 'string' &&
            coords === null
        ) {
            const initialLat = parseFloat(router.query.lat);
            const initialLon = parseFloat(router.query.lon);
            const initialSize = parseInt(router.query.size);
            setZoneNumber(selectRentZone(initialLat, initialLon));
            setUserSelection(
                defaultsDeep(
                    { mandatory: { size: initialSize } },
                    userSelection
                )
            );
            setCoords({ lat: initialLat, lon: initialLon });
        }
    }, [router.query, userSelection, coords]);

    function getTotalSum(
        selection: CustomTypes.userSelection,
        zoneNumber: string
    ): number | null {
        let sum = 0;
        if (selection.mandatory.size === null) {
            return null;
        }

        const base_rent = filter(RENT_AGE_SIZE, function (o) {
            return (
                selection.mandatory.size !== null &&
                o.size_from <= selection.mandatory.size &&
                selection.mandatory.size <= o.size_to
            );
        });
        const max_variance = filter(VARIATION_MAXIMUM, function (o) {
            return (
                selection.mandatory.size !== null &&
                o.size_from <= selection.mandatory.size &&
                selection.mandatory.size <= o.size_to
            );
        });
        if (base_rent.length === 0 || max_variance.length === 0) {
            return null;
        }

        sum =
            base_rent[0].prices[selection.buildingDetails.age] +
            max_variance[0].prices[selection.buildingDetails.age];

        if (zoneNumber === '1') {
            sum += 2.67; // central best
        }
        if (zoneNumber === '2') {
            sum += 1.54; // central good
        }
        if (zoneNumber === '3') {
            sum += 0.9; // central avg.
        }
        if (zoneNumber === '4') {
            sum += 0.64; // good
        }
        if (zoneNumber === '0' || zoneNumber === '5') {
            sum += 0; // unknown || avg.
        }

        // flooring
        if (selection.flooring.quality === '< 50% HQ') {
            sum -= 1.19;
        } else if (selection.flooring.quality === '50 - 99% HQ') {
            sum += 0.09; // average of table 5.3a and 5.3.b
        } else if (selection.flooring.quality === '100% HQ') {
            sum += 1.28;
        }

        if (selection.flooring.lastRenovation === 'after 2013 (included)') {
            sum += 0.86;
        }

        // balcony
        if (selection.balcony.balconyType != 'no balcony') {
            sum += 0.57;
            if (selection.balcony.balconyType === '>= 10m2') {
                sum += 0.31;
            }
            if (selection.balcony.direction === 'points towards S/SW/SE') {
                sum += 0.31;
            } else {
                sum -= 0.15;
            }
        } else {
            sum -= 0.44;
        }

        // building
        if (selection.buildingDetails.gallery === 'gallery') {
            sum += 0.72;
        }
        if (
            selection.buildingDetails.smartStuff ==
            'video intercom or electric shutters'
        ) {
            sum += 0.8;
        }
        if (selection.buildingDetails.rearBuilding === 'rear building') {
            sum += 0.34;
        }
        if (selection.buildingDetails.buildingHeight === '> 7 stories') {
            sum -= 0.42;
        } else {
            if (
                selection.buildingDetails.elevator === 'missing' &&
                selection.buildingDetails.dedicatedGreenSpace === 'exists'
            ) {
                if (
                    (selection.buildingDetails.standalone === 'standalone' &&
                        selection.buildingDetails.multipleEntrances ===
                            'at least 3 entrances') ||
                    (selection.buildingDetails.standalone ===
                        'connected to other buildings' &&
                        selection.buildingDetails.flatCount === '>= 5 flats')
                ) {
                    sum -= 0.62;
                }
            }
        }

        if (
            selection.buildingDetails.age === 'before 1930' ||
            selection.buildingDetails.age === '1930 - 1940' ||
            selection.buildingDetails.age === '1940 - 1950'
        ) {
            if (selection.buildingDetails.ceilingHeight === '<= 2.7m') {
                sum -= 1.94;
            }
            if (selection.buildingDetails.ceilingHeight === '> 2.7m') {
                sum -= 1.4;
            }
        }

        // sanitary
        if (selection.bathroom.towelRadiator === 'exists') {
            sum += 0.47; // table 3.6
        }
        if (selection.bathroom.bathroomSize === '> 6m2') {
            sum += 0.47; // table 3.6
        }
        if (
            selection.buildingDetails.age === 'before 1930' ||
            selection.buildingDetails.age === '1930 - 1940' ||
            selection.buildingDetails.age === '1940 - 1950' ||
            selection.buildingDetails.age === '1950 - 1960' ||
            selection.buildingDetails.age === '1960 - 1970'
        ) {
            if (selection.bathroom.lastRenovation == 'after 2009 (included)') {
                sum += 0.47; // table 3.6
            }
        }
        if (selection.bathroom.bathType === 'luxury bath') {
            sum += 0.47; // table 3.6
        }
        if (selection.bathroom.bathType === 'luxury bath + luxury bathtub') {
            sum += 0.47 + 1.34; // table 3.6 + table 5.4
        }

        // heating
        if (selection.heating.fullWarmWaterAccess != 'yes') {
            sum -= 1.25;
        }
        if (selection.heating.fullHeatingAccess != 'yes') {
            sum -= 1.47;
        }
        if (selection.heating.temperatureIsAdjustable === 'no') {
            sum -= 0.43;
        }
        if (selection.heating.heatingType === 'underfloor heating') {
            sum += 0.57;
        }

        // kitchen
        if (selection.kitchen.ownership === 'landlord owns it') {
            if (selection.kitchen.hasCookingPlate === 'yes') {
                sum += 0.43;
            }
            if (selection.kitchen.hasDishwasher === 'yes') {
                sum += 0.43;
            }
            if (selection.kitchen.hasFridge === 'yes') {
                sum += 0.43;
            }
        }
        if (selection.kitchen.location === 'open kitchen') {
            sum += 0.3;
        }

        // TODO: include prices from table, see https://github.com/ojas121/sueyourlandlord/issues/13
        sum *= selection.mandatory.size;

        return sum;
    }

    useEffect(() => {
        if (userSelection !== null) {
            setTotalSum(getTotalSum(userSelection, zoneNumber));
        }
    }, [userSelection, zoneNumber]);

    if (userSelection === null) {
        ('loading');
    }

    return (
        <>
            <div className='flex flex-row w-screen h-screen'>
                <div className='z-10 flex flex-col w-1/3 h-screen shadow-md'>
                    <ShowTotalSum totalSum={totalSum} />
                    <div className='flex flex-col flex-grow py-4 overflow-x-hidden overflow-y-scroll'>
                        <FormSectionMandatory
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                        <FormSectionBuildingDetails
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                        <FormSectionBathroom
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                        <FormSectionFlooring
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                        <FormSectionKitchen
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                        <FormSectionHeating
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                        <FormSectionBalcony
                            value={userSelection}
                            setValue={setUserSelection}
                        />
                    </div>
                </div>
                <div className='relative z-0 w-2/3 h-screen bg-gray-100 flex-row-center'>
                    {coords !== null && (
                        <div
                            id='map'
                            style={{ width: '100%', height: '100vh' }}
                            className='z-0'
                        >
                            <MapWithNoSSR lat={coords?.lat} lon={coords.lon} />
                        </div>
                    )}
                    <div className='absolute z-10 flex flex-col items-start justify-start p-4 bg-white rounded shadow bottom-2 left-2'>
                        {[
                            {
                                label: getLocalizedLabel('central best'),
                                color: 'bg-red-500',
                                number: '1',
                            },
                            {
                                label: getLocalizedLabel('central good'),
                                color: 'bg-yellow-500',
                                number: '2',
                            },
                            {
                                label: getLocalizedLabel('central avg.'),
                                color: 'bg-blue-500',
                                number: '3',
                            },
                            {
                                label: getLocalizedLabel('good'),
                                color: 'bg-green-500',
                                number: '4',
                            },
                            {
                                label: getLocalizedLabel('avg.'),
                                color: 'bg-purple-500',
                                number: '5',
                            },
                            {
                                label: getLocalizedLabel('unknown'),
                                color: 'bg-gray-300',
                                number: '0',
                            },
                        ].map(a => (
                            <div
                                className='flex-row-center gap-x-2'
                                key={a.number}
                            >
                                <div
                                    className={'w-4 h-4 rounded-sm ' + a.color}
                                />
                                <div
                                    className={
                                        a.number === zoneNumber
                                            ? 'font-medium text-black '
                                            : 'font-regular text-gray-600'
                                    }
                                >
                                    {a.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='absolute bottom-3 right-3'>
                        <Link href={`/${pageIsGerman ? 'de' : 'en'}/sue`}>
                            <div
                                className={
                                    'px-3 py-2 font-medium text-center rounded-md bg-rose-500 text-rose-50 cursor-pointer text-3xl'
                                }
                            >
                                ????????????? &nbsp;{getLocalizedLabel('Sue!')}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
