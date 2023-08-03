import { getSession } from 'next-auth/react'
export default async function getSessionDataAddress(sessionData:any) {
    var userAddrData = {
        data: {
            addresses: []
        }
    };
    if (sessionData) {
        const userAddrheaderRes = await fetch('https://prodapp.lifepharmacy.com/api/user/addresses', {
            headers: {
                Authorization: `Bearer ${sessionData.token.token}`
            }
        });
        userAddrData = await userAddrheaderRes.json();
    }
}
    // const res = await fetch('https://prodapp.lifepharmacy.com/api/web/brands')

    // if (!res.ok) throw new Error('failed to fetch data')

    // return res.json()
