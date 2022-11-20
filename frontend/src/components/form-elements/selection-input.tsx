export default function SelectionInput(props: {
    label: string;
    value: string | null;
    values: string[];
    setValue(v: string | null): void;
}) {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700'>
                {props.label}
            </label>
            <div className='inline-flex flex-wrap'>
                {props.values.map(v => (
                    <div
                        key={v}
                        className={
                            (v === props.value
                                ? 'bg-white text-gray-900 font-medium '
                                : 'bg-gray-200 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 font-regular ') +
                            'border px-3 py-0.5 text-sm rounded m-0.5 shadow-sm border-gray-300 ' +
                            'no-selection'
                        }
                        onClick={() => props.setValue(v)}
                    >
                        {v}
                    </div>
                ))}
            </div>
        </div>
    );
}
