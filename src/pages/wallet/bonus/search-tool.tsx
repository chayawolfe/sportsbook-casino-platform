import { Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { _dateRangeOptions } from '_mock';
import { useTranslate } from 'locales';
interface IWithdrawSearchTool {
    status: string;
    onChangeStatus: (value: string) => void;
}

export default function BonusSearchTool({ status, onChangeStatus }: IWithdrawSearchTool) {
    const { t } = useTranslate();
    return (
        <Stack flexDirection="row" gap={1}>
            <FormControl sx={{ width: { md: 0.5, xs: 1 } }}>
                <InputLabel id="status-select-label">{t('status')}</InputLabel>
                <Select
                    size="small"
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    label="Status"
                    onChange={(e) => onChangeStatus(e.target.value)}
                >
                    <MenuItem value="all">{t('all')}</MenuItem>
                    <MenuItem value="pending">{t('pending')}</MenuItem>
                    <MenuItem value="success">{t('success')}</MenuItem>
                    <MenuItem value="payout">{t('payout')}</MenuItem>
                    <MenuItem value="declined">{t('declined')}</MenuItem>
                    <MenuItem value="failed">{t('failed')}</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}
