import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import FormSection from '../form-elements/form-section';
import SelectionInput from '../form-elements/selection-input';

export default function FormSectionBuildingDetails(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <FormSection label='building details'>
            <SelectionInput
                label='building age (just estimate)'
                value={props.value.buildingDetails.age}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { buildingDetails: { age: v } },
                            props.value
                        )
                    )
                }
                values={[
                    'before 1930',
                    '1930 - 1940',
                    '1940 - 1950',
                    '1950 - 1960',
                    '1960 - 1970',
                    '1970 - 1980',
                    '1980 - 1990',
                    '1990 - 2000',
                    '2000 - 2010',
                    'after 2010',
                ]}
            />
            <SelectionInput
                label='type'
                value={props.value.buildingDetails.buildingHeight}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { buildingDetails: { buildingHeight: v } },
                            props.value
                        )
                    )
                }
                values={['<= 7 stories', '> 7 stories']}
            />
            {props.value.buildingDetails.age !== null &&
                ['before 1930', '1930 - 1940', '1940 - 1950'].includes(
                    props.value.buildingDetails.age
                ) && (
                    <SelectionInput
                        label='ceiling height'
                        value={props.value.buildingDetails.ceilingHeight}
                        setValue={v =>
                            props.setValue(
                                defaultsDeep(
                                    { buildingDetails: { ceilingHeight: v } },
                                    props.value
                                )
                            )
                        }
                        values={['<= 2.7m', '> 2.7m']}
                    />
                )}
            <SelectionInput
                label='rear building'
                value={props.value.buildingDetails.rearBuilding}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { buildingDetails: { rearBuilding: v } },
                            props.value
                        )
                    )
                }
                values={['rear building', 'next to street']}
            />
            <SelectionInput
                label='smart stuff'
                value={props.value.buildingDetails.smartStuff}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { buildingDetails: { smartStuff: v } },
                            props.value
                        )
                    )
                }
                values={[
                    'video intercom or electric shutters',
                    'no/only other smart stuff',
                ]}
            />
            <SelectionInput
                label='gallery'
                value={props.value.buildingDetails.gallery}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { buildingDetails: { gallery: v } },
                            props.value
                        )
                    )
                }
                values={['gallery', 'no gallery']}
            />
            <SelectionInput
                label='elevator'
                value={props.value.buildingDetails.elevator}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { buildingDetails: { elevator: v } },
                            props.value
                        )
                    )
                }
                values={['exists', 'missing']}
            />
            {props.value.buildingDetails.elevator === 'missing' && (
                <>
                    <SelectionInput
                        label='dedicated green space'
                        value={props.value.buildingDetails.dedicatedGreenSpace}
                        setValue={v =>
                            props.setValue(
                                defaultsDeep(
                                    {
                                        buildingDetails: {
                                            dedicatedGreenSpace: v,
                                        },
                                    },
                                    props.value
                                )
                            )
                        }
                        values={['exists', 'missing']}
                    />
                </>
            )}
            {props.value.buildingDetails.elevator === 'missing' &&
                props.value.buildingDetails.dedicatedGreenSpace ===
                    'exists' && (
                    <>
                        <SelectionInput
                            label='standalone'
                            value={props.value.buildingDetails.standalone}
                            setValue={v =>
                                props.setValue(
                                    defaultsDeep(
                                        {
                                            buildingDetails: {
                                                standalone: v,
                                            },
                                        },
                                        props.value
                                    )
                                )
                            }
                            values={[
                                'standalone',
                                'connected to other buildings',
                            ]}
                        />
                        {props.value.buildingDetails.standalone ===
                            'standalone' && (
                            <>
                                <SelectionInput
                                    label='multiple entrances'
                                    value={
                                        props.value.buildingDetails
                                            .multipleEntrances
                                    }
                                    setValue={v =>
                                        props.setValue(
                                            defaultsDeep(
                                                {
                                                    buildingDetails: {
                                                        multipleEntrances: v,
                                                    },
                                                },
                                                props.value
                                            )
                                        )
                                    }
                                    values={[
                                        'at least 3 entrances',
                                        'otherwise',
                                    ]}
                                />
                            </>
                        )}
                        {props.value.buildingDetails.standalone ===
                            'connected to other buildings' && (
                            <>
                                <SelectionInput
                                    label='flat count'
                                    value={
                                        props.value.buildingDetails.flatCount
                                    }
                                    setValue={v =>
                                        props.setValue(
                                            defaultsDeep(
                                                {
                                                    buildingDetails: {
                                                        flatCount: v,
                                                    },
                                                },
                                                props.value
                                            )
                                        )
                                    }
                                    values={['>= 5 flats', '< flats']}
                                />
                            </>
                        )}
                    </>
                )}
        </FormSection>
    );
}
