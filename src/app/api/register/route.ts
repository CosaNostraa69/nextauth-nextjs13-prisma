import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json() as {
            username: string;
            email: string;
            password: string;
        };
        const hashedPassword = await hash(password, 12);  // Utilisez 'hashedPassword' comme le nom de la nouvelle variable

        const user = await prisma.user.create({
            data: {
                username,
                email: email.toLowerCase(),
                passwordHash: hashedPassword,  // Ici, utilisez 'hashedPassword'
            },
        });

        return NextResponse.json({
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
