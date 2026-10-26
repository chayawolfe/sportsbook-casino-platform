import { Navigate, useRoutes } from 'react-router-dom';
import { paths } from 'routes/paths';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        // Main routes
        ...mainRoutes,

        // No match 404
        { path: '*', element: <Navigate to={paths.home.root} replace /> }
    ]);
}
