import React, { useState } from 'react';
import 'react-dates/initialize';
import {
    DateRangePicker,
    // SingleDatePicker,
    // DayPickerRangeController,
} from 'react-dates';

import moment from 'moment';

import '../../../node_modules/react-dates/lib/css/_datepicker.css';
const enumerateDaysBetweenDates = (startDate, endDate) => {
    var now = startDate.clone(),
        dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('M/D/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};
const DatePicker = ({ dateRange, reserve, booking }) => {
    const detePickerItems = {
        dateFormat: 'DD/MM/YYYY',
        small: false,
        block: false,
        orientation: 'horizontal',
        numMonths: reserve ? 1 : 2,
    };
    const [startDateItems, setStartDateItems] = useState(null);
    const [endDateItems, setEndDateItems] = useState(null);
    const [focusInputItems, setFocusInputItems] = useState(null);

    const BLOCKED_DATES = [];

    if (booking) {
        booking.map(dates => {
            BLOCKED_DATES.push(
                ...enumerateDaysBetweenDates(
                    moment(new Date(dates.startDate)),
                    moment(new Date(dates.endDate))
                )
            );
            return 1;
        });
    }

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDateItems(startDate);
        setEndDateItems(endDate);
    };
    const handleFocusChange = focusedInput => {
        setFocusInputItems(focusedInput);
    };

    const handleIsDayBlocked = day => {
        const blockedDates =
            BLOCKED_DATES.filter(d => moment(d).isSame(day, 'day')).length >
                0 ||
            (reserve && moment(day).diff(moment(), 'M') > 2);

        return blockedDates;
    };
    const onClose = dates => {
        if (reserve && dates.endDate && dates.startDate) {
            dateRange({
                startDate: new Date(dates.startDate),
                endDate: new Date(dates.endDate),
            });
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
