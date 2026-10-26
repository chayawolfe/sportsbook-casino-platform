import { Stack } from '@mui/material';
import VipBanner from './vip-banner';
import VipBonus from './vip-bonus';
import VipFaq from './vip-faq';
import VipStatus from './vip-status';
import VipType from './vip-type';
import { useAuth } from 'hooks/use-auth-context';
import { useEffect, useState } from 'react';
import { settingApi } from 'api/setting.api';
import { IVip } from 'types/site';

const VipPage = () => {
    const { isLogined } = useAuth();

    const [data, setData] = useState<IVip[]>([]);

    const loadData = async () => {
        const response = await settingApi.getVips();
        setData(response);
    };

    useEffect(() => {
        if (isLogined) {
            loadData();
        }
        // eslint-disable-next-line
    }, [isLogined]);

    return (
        <Stack direction="column" gap={3}>
            {!isLogined && <VipBanner />}

            {isLogined && (
                <>
                    <VipStatus vipData={data} />
                    <VipBonus />
                </>
            )}

            <VipType />
            <VipFaq />
        </Stack>
    );
};

export default VipPage;
