// components
import Loader from 'components/Loader';

import { AuthContext, AuthContextValue } from './auth-context';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export function AuthConsumer({ children }: Props) {
    return (
        <AuthContext.Consumer>
            {(auth: AuthContextValue | null) => (auth === null || (auth && auth.authLoading) ? <Loader /> : children)}
        </AuthContext.Consumer>
    );
}
