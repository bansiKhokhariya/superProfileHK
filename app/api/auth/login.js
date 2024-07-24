// import { Magic } from '@magic-sdk/admin';

// const magic = new Magic(process.env.MAGIC_SECRET_KEY);

// export async function POST(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).end('Method Not Allowed');
//   }

//   try {
//     const didToken = req.headers.authorization.substr(7);
//     await magic.token.validate(didToken);

//     const metadata = await magic.users.getMetadataByToken(didToken);
//     const email = metadata.email;

//     res.status(200).json({ authenticated: true, email });
//   } catch (error) {
//     console.log("error=================>", error);
//     res.status(500).json({ error: error.message });
//   }
// }


import { Magic } from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req, res) {
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);

    const metadata = await magic.users.getMetadataByToken(didToken);

    res.status(200).json({ authenticated: true, user: metadata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ authenticated: false, error: error.message });
  }
}
