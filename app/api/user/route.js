export async function GET() {
  const defaultData = {
    id: 1,
    name: "John Doe",
    email: "johndoe@yopmail.com",
    publicKey: "0x1234567890abcdef1234567890abcdef12345678",
  };

  return Response.json(defaultData);
}