const enc = new TextEncoder();
const dec = new TextDecoder();

let aesKey: CryptoKey | null = null; // kunci disimpan selama runtime

async function generateKey(): Promise<void> {
  aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptText(
  text: string
): Promise<{ iv: string; ciphertext: string }> {
  if (!aesKey) throw new Error("Key not generated. Call generateKey() first.");

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = enc.encode(text);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encodedText
  );
  console.log(bufferToBase64(iv.buffer), bufferToBase64(ciphertext));

  return {
    iv: bufferToBase64(iv.buffer),
    ciphertext: bufferToBase64(ciphertext),
  };
}

export async function decryptText(
  ciphertextBase64: string,
  ivBase64: string
): Promise<string> {
  if (!aesKey) throw new Error("Key not generated. Call generateKey() first.");

  const iv = new Uint8Array(base64ToBuffer(ivBase64));
  const ciphertext = base64ToBuffer(ciphertextBase64);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    ciphertext
  );

  return dec.decode(decrypted);
}

function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

await generateKey();
