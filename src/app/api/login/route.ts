import { NextResponse } from "next/server";
import { authenticateUser } from "../../../lib/auth";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await authenticateUser(email, password);

  if (!user) {
    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  const token = user.id;

  const cookie = serialize("auth-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
  });

  const response = NextResponse.json({ message: "Logado" });
  response.headers.set("Set-Cookie", cookie);

  return response;
}
