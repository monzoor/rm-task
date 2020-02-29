import React, { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import moment from 'moment';

import 'react-dates/lib/css/_datepicker.css';

const enumerateDaysBetweenDates = (startDate, endDate) => {
    const now = startDate.clone();
    const dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
        now.add(1, 'days');
    }
    return dates;
};
const DatePicker = ({
    dateRange,
    reserve,
    booking,
    search,
    dateRangeValuesFromSearchString,
}) => {
    const detePickerItems = {
        dateFormat: 'MM-DD-YYYY',
        small: false,
        block: false,
        orientation: 'horizontal',
        numMonths: reserve ? 1 : 2,
    };
    const [startDateItems, setStartDateItems] = useState(
        search && dateRangeValuesFromSearchString.startDate
            ? moment(new Date(dateRangeValuesFromSearchString.startDate))
            : null
    );
    const [endDateItems, setEndDateItems] = useState(
        search && dateRangeValuesFromSearchString.endDate
            ? moment(new Date(dateRangeValuesFromSearchString.endDate))
            : null
    );
    const [focusInputItems, setFocusInputItems] = useState(null);

    const BLOCKED_DATES = [];

    if (booking) {
        booking.map(dates => {
            BLOCKED_DATES.push(
                ...enumerateDaysBetweenDates(
                    moment(dates.startDate),
                    moment(dates.endDate)
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
        dateRange({
            startDate: new Date(dates.startDate),
            endDate: new Date(dates.endDate),
        });
    };

    return (
        <div>
            <DateRangePicker
                startDateId={reserve ? 'startDateReserve' : 'startDateSearch'}
                endDateId={reserve ? 'endDateReserve' : 'endDateSearch'}
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
