## User Initiates Sign-In:

- User enters email and password on the sign-in page.
- The form uses React Hook Form with Zod for validation.

## Sign-In Request:

The signIn function in `sign-in.ts` is called with user credentials.

- It sends a POST request to `/api/auth/login` using the axios instance.

## Server Authentication:

- The server validates credentials and responds with user data and an access token.

## Client-Side Token Storage:

On successful login, `setAuthCookies` in `auth/utils.ts` stores the access token and user data in HTTP-only cookies.

## Authenticated State:

- The app now considers the user authenticated.
- getAuthState in `auth/utils.ts` can retrieve the auth state from cookies.

## Protected Routes:

The middleware in middleware.ts checks for a valid access token on protected routes.

- If no token or expired, it redirects to the sign-in page.

## API Requests:

- The axios instance in `axios.ts` automatically adds the access token to request headers.

## Token Refresh:

- If an API request returns a 401 error, the axios interceptor attempts to refresh the token.
- refreshToken in refresh-token.ts sends a request to get a new access token.
- If successful, it updates the cookies and retries the original request.

## Sign-Out:

- When the user signs out, clearAuthCookies in `auth/utils.ts` removes the auth cookies.

This flow ensures secure authentication, protects routes, and handles token refresh automatically, providing a seamless user experience.
