export const ROUTE_LOGIN = 'ROUTE_LOGIN';
export const ROUTE_SIGNUP = 'ROUTE_SIGNUP';
export const ROUTE_DASHBOARD = 'ROUTE_DASHBOARD';
export const ROUTE_CASH_OUT = 'ROUTE_CASH_OUT';
export const ROUTE_BUY = 'ROUTE_BUY';
export const ROUTE_USER_PROFILE = 'ROUTE_USER_PROFILE';

export const LOGGED_IN_ROUTES = {
  ROUTE_DASHBOARD: true,
  ROUTE_CASH_OUT: true,
  ROUTE_BUY: true,
  ROUTE_USER_PROFILE: true,
};

// export const LOGGED_OUT_ROUTES = {
//   ROUTE_LOGIN: true,
//   ROUTE_SIGNUP: true,
// };

export function isRouteLoggedIn( routeAction ) {
  return Boolean(LOGGED_IN_ROUTES[routeAction]);
}

const routesMap = {
  [ ROUTE_LOGIN ]: '/',
  [ ROUTE_SIGNUP ]: '/signup',
  [ ROUTE_DASHBOARD ]: '/dashboard',
  [ ROUTE_CASH_OUT ]: '/cash-out',
  [ ROUTE_BUY ]: '/buy',
  [ ROUTE_USER_PROFILE ]: '/profile',
};

export default routesMap;
