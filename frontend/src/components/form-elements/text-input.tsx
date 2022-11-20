export default function TextInput(props: {
    label: string;
    value: string;
    setValue(v: string): void;
}) {
    return (
        <div className='w-full'>
            <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
            >
                {props.label}
            </label>
            <div className='w-full mt-1'>
                <input
                    type='text'
                    className='block w-full px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm '
                    value={props.value == null ? '' : props.value.toString()}
                    onChange={e => props.setValue(e.target.value)}
                />
            </div>
        </div>
    );
}
