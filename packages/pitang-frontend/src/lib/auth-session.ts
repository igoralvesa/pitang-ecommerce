const ACCESS_TOKEN_COOKIE = "@pitang/accessToken";
const AUTH_ME_URL = "https://dummyjson.com/auth/me";

/** Read a single cookie by name (first match in `document.cookie`). */
export function getCookie(cookieName: string): string | undefined {
    return document.cookie
        .split("; ")
        .find((c) => c.startsWith(`${cookieName}=`))
        ?.split("=")[1];
}

export function getAccessTokenFromCookie(): string | undefined {
    return getCookie(ACCESS_TOKEN_COOKIE);
}

export function setAccessTokenCookie(
    accessToken: string,
    maxAgeSeconds = 86_400, // 24 hours
): void {
    document.cookie = `${ACCESS_TOKEN_COOKIE}=${accessToken}; path=/; Max-Age=${maxAgeSeconds}`;
}

export function clearAccessTokenCookie(): void {
    document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; Max-Age=0`;
}

export async function isAuthenticated(): Promise<boolean> {
    const accessToken = getAccessTokenFromCookie();
    if (!accessToken) return false;

    const response = await fetch(AUTH_ME_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 401) {
        clearAccessTokenCookie();
        return false;
    }

    return response.ok;
}