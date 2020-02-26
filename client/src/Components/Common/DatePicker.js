import React, { useState } from 'react';
import 'react-dates/initialize';
import {
    DateRangePicker,
    // SingleDatePicker,
    // DayPickerRangeController,
} from 'react-dates';

import moment from 'moment';

import '../../../node_modules/react-dates/lib/css/_datepicker.css';

const DatePicker = ({ daysCounter, reserve }) => {
    const detePickerItems = {
        dateFormat: 'DD/MM/YYYY',
        small: false,
        block: false,
        orientation: 'horizontal',
        numMonths: 1,
    };
    const [startDateItems, setStartDateItems] = useState(null);
    const [endDateItems, setEndDateItems] = useState(null);
    const [focusInputItems, setFocusInputItems] = useState(null);

    const BLOCKED_DATES = [
        // moment('Sun Mar 01 2020 20:48:50 GMT+0600'),
        moment(new Date()).add(3, 'M'),
        moment().add(12, 'days'),
    ];

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDateItems(startDate);
        setEndDateItems(endDate);
    };
    const handleFocusChange = focusedInput => {
        // console.log('----', focusedInput);
        setFocusInputItems(focusedInput);
        // setDatePickerItems.focusedInput = focusedInput;
    };
    // console.log('----', moment().add(3, 'M'));

    const handleIsDayBlocked = day => {
        const tt =
            BLOCKED_DATES.filter(d => d.isSame(day, 'day')).length > 0 ||
            moment(day).diff(moment(), 'M') > 2;

        return tt;
        // return moment(day).diff(moment(), 'M') > 2;
    };
    const onClose = dates => {
        // console.log(
        //         '====',
        //         moment('Sun Mar 01 2020 20:48:50 GMT+0600', 'DD/MM/YYYY')
        //     );
        if (reserve && dates.endDate && dates.startDate) {
            daysCounter(dates.endDate.diff(dates.startDate, 'days'));
        }
    };

    return (
        <div>
            <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={startDateItems}
                endDate={endDateItems}
                onDatesChange={handleDatesChange}
                focusedInput={focusInputItems}
                onFocusChange={handleFocusChange}
                displayFormat={detePickerItems.dateFormat}
                hideKeyboardShortcutsPanel={true}
                numberOfMonths={detePickerItems.numMonths || 2}
                block={detePickerItems.block}
                small={detePickerItems.small}
                isDayBlocked={handleIsDayBlocked}
                onClose={onClose}
            />
        </div>
    );
};

export default DatePicker;
