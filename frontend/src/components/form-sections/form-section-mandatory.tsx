import { defaultsDeep } from 'lodash';
import CustomTypes from '../../utils/custom-types';
import NumberInput from '../form-elements/number-input';

export default function FormSectionMandatory(props: {
    value: CustomTypes.userSelection;
    setValue(v: CustomTypes.userSelection): void;
}) {
    return (
        <div className='flex flex-col px-3 pb-3 mb-3 gap-y-6'>
            <NumberInput
                label='size [m2] (between 20 and 160 m2)'
                value={props.value.mandatory.size}
                setValue={v =>
                    props.setValue(
                        defaultsDeep({ mandatory: { size: v } }, props.value)
                    )
                }
            />
        </div>
    );
}
