import { Session } from "next-auth"
export default async function getSessionData(cookie: string): Promise<Session>  {
    const response = await fetch('https://life-pro.vercel.app/api/auth/session', {
        headers: {
            cookie,
        },
    });

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}
    