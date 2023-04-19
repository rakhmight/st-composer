import { Crypt } from 'hybrid-crypto-js'

export default async function asyncCrypt(target, publicKey){
    const crypt = new Crypt({
        aesStandard: 'AES-CBC',
        rsaStandard: 'RSA-OAEP',
    });
    const encrypted = crypt.encrypt(publicKey, JSON.stringify(target));

    return encrypted
}