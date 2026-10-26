import axios from 'utils/axios';

export const verifyApi = {
    sendEmailVerify: async (data: { email: string }) => {
        const res = await axios.post('/api/verify/email-verify', data);
        return res.data;
    },
    resendEmailVerify: async (data: { email: string }) => {
        const res = await axios.post('/api/verify/email-resend', data);
        return res.data;
    },
    emailCodeVerify: async (data: { code: string }) => {
        const res = await axios.post('/api/verify/email-code', data);
        return res.data;
    }
};
