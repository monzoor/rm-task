import React, { useState } from 'react';
import 'react-dates/initialize';
import {
    DateRangePicker,
    // SingleDatePicker,
    // DayPickerRangeController,
} from 'react-dates';

import moment from 'moment';

import '../../../node_modules/react-dates/lib/css/_datepicker.css';

const DatePicker = () => {
    const [detePickerItems, setDatePickerItems] = useState({
        startDate: moment(),
        endDate: moment(),
        focusedInput: null,
        dateFormat: 'DD/MM/YYYY',
        small: false,
        block: false,
        orientation: 'horizontal',
        numMonths: 2,
    });

    const BLOCKED_DATES = [
        moment().add(10, 'days'),
        moment().add(11, 'days'),
        moment().add(12, 'days'),
    ];

    const handleDatesChange = ({ startDate, endDate }) => {
        console.log('=====', new moment(startDate).format('DD/MM/YYYY'));

        setDatePickerItems({
            ...detePickerItems,
            startDate,
            endDate,
            // startDate:
            //     startDate !== null ? startDate : detePickerItems.startDate,
            // endDate: endDate !== null ? endDate : detePickerItems.endDate,
            // startDate: new moment(startDate).format('DD/MM/YYYY'),
            // endDate: new moment(endDate).format('DD/MM/YYYY'),
        });
    };
    const handleFocusChange = focusedInput => {
        // console.log('----', focusedInput);
        setDatePickerItems({ ...detePickerItems, focusedInput });
        // setDatePickerItems.focusedInput = focusedInput;
    };

    const handleIsDayBlocked = day => {
        return BLOCKED_DATES.filter(d => d.isSame(day, 'day')).length > 0;
    };

    console.log(
        '----',
        new moment(detePickerItems.startDate).format('DD/MM/YYYY')
    );

    return (
        <div>
            <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={detePickerItems.startDate}
                endDate={detePickerItems.endDate}
                onDatesChange={handleDatesChange}
                focusedInput={detePickerItems.focusedInput}
                onFocusChange={handleFocusChange}
                displayFormat={detePickerItems.dateFormat}
                hideKeyboardShortcutsPanel={true}
                numberOfMonths={detePickerItems.numMonths || 2}
                block={detePickerItems.block}
                small={detePickerItems.small}
                isDayBlocked={handleIsDayBlocked}
            />
        </div>
    );
};

export default DatePicker;
