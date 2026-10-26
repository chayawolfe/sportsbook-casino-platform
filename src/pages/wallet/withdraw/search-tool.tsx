import { useEffect, useState } from 'react';
import moment from 'moment';
import { Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { _dateRangeOptions } from '_mock';
import { useTranslate } from 'locales';
import CustomDateRangePicker, { useDateRangePicker } from '../../../components/custom-date-range-picker';

interface IWithdrawSearchTool {
    status: string;
    onChangeStatus: (value: string) => void;
    setDate: ({ start, end }: { start: Date; end: Date }) => void;
}

export default function WithdrawSearchTool({ status, setDate, onChangeStatus }: IWithdrawSearchTool) {
    const { t } = useTranslate();
    const rangeCalendarPicker = useDateRangePicker(new Date(), null);
    const [selectedDuration, setSelectedDuration] = useState<string>('60');

    const getPastDate = (days: number) => {
        return {
            start: moment().add(-days, 'days').startOf('day').toDate(),
            end: moment().endOf('day').toDate()
        };
    };

    const changeDuration = (value: string) => {
        if (value === 'custom' && rangeCalendarPicker.onOpen) {
            rangeCalendarPicker.onOpen();
        } else {
            const dateRange = getPastDate(Number(value));
            setDate(dateRange);
        }
    };

    useEffect(() => {
        if (rangeCalendarPicker.startDate && rangeCalendarPicker.endDate) {
            setDate({
                start: rangeCalendarPicker.startDate,
                end: rangeCalendarPicker.endDate
            });
        }
    }, [rangeCalendarPicker.startDate, rangeCalendarPicker.endDate]);

    useEffect(() => {
        changeDuration(selectedDuration);
    }, [selectedDuration]);
    return (
        <Stack flexDirection="row" gap={1}>
            <FormControl fullWidth>
                <InputLabel>{t('status')}</InputLabel>
                <Select size="small" value={status} label="Status" onChange={(e) => onChangeStatus(e.target.value)}>
                    <MenuItem value="all">{t('all')}</MenuItem>
                    <MenuItem value="pending">{t('pending')}</MenuItem>
                    <MenuItem value="success">{t('success')}</MenuItem>
                    <MenuItem value="payout">{t('payout')}</MenuItem>
                    <MenuItem value="declined">{t('declined')}</MenuItem>
                    <MenuItem value="failed">{t('failed')}</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>{t('duration')}</InputLabel>
                <Select
                    size="small"
                    label="Duration"
                    id="duration-select"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                >
                    {_dateRangeOptions.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                            {t(`${item.label}`)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <CustomDateRangePicker
                variant="calendar"
                open={rangeCalendarPicker.open}
                startDate={rangeCalendarPicker.startDate}
                endDate={rangeCalendarPicker.endDate}
                onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
                onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
                onClose={rangeCalendarPicker.onClose}
                error={rangeCalendarPicker.error}
            />
        </Stack>
    );
}
