import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "EMAIL_REQUIRED" },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return NextResponse.json({ exists: Boolean(user) });
  } catch {
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      {
        status: 500,
      },
    );
  }
}
