import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerComponent() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleSubmit = () => {
        console.log(selectedDate);
    };

    return (
        <div>
            <DatePicker placeholderText='Choose Date' className=' w-full font-work_sans px-2 py-2  border border-gray-300 text-gray-900  rounded-lg'
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
            />
            {/* <button onClick={handleSubmit}>Submit</button> */}
        </div>
    );
}

export default DatePickerComponent;
