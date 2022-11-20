import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import FormSection from '../form-elements/form-section';
import SelectionInput from '../form-elements/selection-input';

export default function FormSectionBalcony(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <FormSection label='balcony'>
            <SelectionInput
                label='type'
                value={props.value.balcony.balconyType}
                setValue={v =>
                    props.setValue(
                        defaultsDeep(
                            { balcony: { balconyType: v } },
                            props.value
                        )
                    )
                }
                values={['no balcony', '< 10m2', '>= 10m2']}
            />
            {props.value.balcony.balconyType !== 'no balcony' && (
                <SelectionInput
                    label='direction'
                    value={props.value.balcony.direction}
                    setValue={v =>
                        props.setValue(
                            defaultsDeep(
                                { balcony: { direction: v } },
                                props.value
                            )
                        )
                    }
                    values={['points towards S/SW/SE', 'other']}
                />
            )}
        </FormSection>
    );
}
