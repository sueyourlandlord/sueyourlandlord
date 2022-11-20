import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import FormSection from '../form-elements/form-section';
import SelectionInput from '../form-elements/selection-input';

export default function FormSectionFlooring(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <FormSection label='flooring'>
            <SelectionInput
                label='quality (HQ = High Quality = Wood, Stone, etc.)'
                value={props.value.flooring.quality}
                setValue={v =>
                    props.setValue(
                        defaultsDeep({ flooring: { quality: v } }, props.value)
                    )
                }
                values={['< 50% HQ', '50 - 99% HQ', '100% HQ']}
            />
            <SelectionInput
                label='last renovation'
                value={props.value.flooring.lastRenovation}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { flooring: { lastRenovation: v } },
                            props.value
                        )
                    )
                }
                values={['before 2013', 'after 2013 (including)']}
            />
        </FormSection>
    );
}
