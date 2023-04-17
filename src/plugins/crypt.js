import crypto from 'crypto'

export default function crypt(target, encodedkey, encodediv, algorithm, notation, encoding) {
    const key = Uint8Array.from(atob(encodedkey), c => c.charCodeAt(0))
    const iv = Uint8Array.from(atob(encodediv), c => c.charCodeAt(0))
    target = JSON.stringify(target)

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encryptedTarget = cipher.update(target, encoding, notation) + cipher.final(notation);

    return encryptedTarget
}