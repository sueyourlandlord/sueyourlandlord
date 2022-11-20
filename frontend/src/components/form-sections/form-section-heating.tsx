import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import FormSection from '../form-elements/form-section';
import SelectionInput from '../form-elements/selection-input';

export default function FormSectionHeating(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <FormSection label='heating'>
            <SelectionInput
                label='type'
                value={props.value.heating.heatingType}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { heating: { heatingType: v } },
                            props.value
                        )
                    )
                }
                values={['underfloor heating', 'radiator heating']}
            />
            <SelectionInput
                label='heating in every room'
                value={props.value.heating.fullHeatingAccess}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { heating: { fullHeatingAccess: v } },
                            props.value
                        )
                    )
                }
                values={['yes', 'no']}
            />
            <SelectionInput
                label='warm water in both kitchen and bathrooms'
                value={props.value.heating.fullWarmWaterAccess}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { heating: { fullWarmWaterAccess: v } },
                            props.value
                        )
                    )
                }
                values={['yes', 'no']}
            />
            <SelectionInput
                label='temperature is adjustable'
                value={props.value.heating.temperatureIsAdjustable}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { heating: { temperatureIsAdjustable: v } },
                            props.value
                        )
                    )
                }
                values={['yes', 'no']}
            />
        </FormSection>
    );
}
