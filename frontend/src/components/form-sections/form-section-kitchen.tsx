import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import FormSection from '../form-elements/form-section';
import SelectionInput from '../form-elements/selection-input';

export default function FormSectionKitchen(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <FormSection label='kitchen'>
            <SelectionInput
                label='location'
                value={props.value.kitchen.location}
                setValue={v =>
                    props.setValue(
                        defaultsDeep({ kitchen: { location: v } }, props.value)
                    )
                }
                values={['kitchen in dedicated room', 'open kitchen']}
            />
            <SelectionInput
                label='ownership'
                value={props.value.kitchen.ownership}
                setValue={v =>
                    props.setValue(
                        defaultsDeep({ kitchen: { ownership: v } }, props.value)
                    )
                }
                values={['landlord owns it', 'you own it']}
            />
            {props.value.kitchen.ownership === 'landlord owns it' && (
                <>
                    <SelectionInput
                        label='has cooking plate'
                        value={props.value.kitchen.hasCookingPlate}
                        setValue={v =>
                            props.setValue(
                                defaultsDeep(
                                    { kitchen: { hasCookingPlate: v } },
                                    props.value
                                )
                            )
                        }
                        values={['yes', 'no']}
                    />
                    <SelectionInput
                        label='has fridge'
                        value={props.value.kitchen.hasFridge}
                        setValue={v =>
                            props.setValue(
                                defaultsDeep(
                                    { kitchen: { hasFridge: v } },
                                    props.value
                                )
                            )
                        }
                        values={['yes', 'no']}
                    />
                    <SelectionInput
                        label='has dishwasher'
                        value={props.value.kitchen.hasDishwasher}
                        setValue={v =>
                            props.setValue(
                                defaultsDeep(
                                    { kitchen: { hasDishwasher: v } },
                                    props.value
                                )
                            )
                        }
                        values={['yes', 'no']}
                    />
                </>
            )}
        </FormSection>
    );
}
