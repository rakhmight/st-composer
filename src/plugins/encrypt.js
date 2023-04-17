import { createDecipheriv } from 'crypto'

export default function encrypt(target, encodedkey, encodediv, algorithm, notation, encoding) {
    const key = Uint8Array.from(atob(encodedkey), c => c.charCodeAt(0))
    const iv = Uint8Array.from(atob(encodediv), c => c.charCodeAt(0))

    const decipher = createDecipheriv(algorithm, key, iv);

    const decryptedTarget = decipher.update(target, notation, encoding) + decipher.final(encoding);

    return decryptedTarget
}