import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import FormSection from '../form-elements/form-section';
import SelectionInput from '../form-elements/selection-input';

export default function FormSectionBathroom(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <FormSection label='bathroom'>
            <SelectionInput
                label='bath type'
                value={props.value.bathroom.bathType}
                setValue={v =>
                    props.setValue(
                        defaultsDeep({ bathroom: { bathType: v } }, props.value)
                    )
                }
                values={[
                    'normal bath',
                    'luxury bath',
                    'luxury bath + luxury bathtub',
                ]}
            />
            <SelectionInput
                label='bathroom size'
                value={props.value.bathroom.bathroomSize}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { bathroom: { bathroomSize: v } },
                            props.value
                        )
                    )
                }
                values={['<= 6m2', '> 6m2']}
            />
            <SelectionInput
                label='towel radiator'
                value={props.value.bathroom.towelRadiator}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { bathroom: { towelRadiator: v } },
                            props.value
                        )
                    )
                }
                values={['exists', 'missing']}
            />
            {props.value.buildingDetails.age !== null &&
                [
                    'before 1930',
                    '1930 - 1940',
                    '1940 - 1950',
                    '1950 - 1960',
                ].includes(props.value.buildingDetails.age) && (
                    <SelectionInput
                        label='last renovation'
                        value={props.value.bathroom.lastRenovation}
                        setValue={v =>
                            props.setValue(
                                defaultsDeep(
                                    { bathroom: { lastRenovation: v } },
                                    props.value
                                )
                            )
                        }
                        values={['before 2009', 'after 2009 (included)']}
                    />
                )}
        </FormSection>
    );
}
