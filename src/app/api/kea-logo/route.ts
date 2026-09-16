import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const userUploadPath = "/home/node/.gemini/antigravity/brain/b0efb42a-0567-456c-ad21-502cf57f0972/.user_uploaded/media_1789559175925.jpg";
  const publicDir = path.join(process.cwd(), "public", "assets");
  const localTarget = path.join(publicDir, "kea-logo.jpg");

  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    if (fs.existsSync(userUploadPath)) {
      if (!fs.existsSync(localTarget)) {
        fs.copyFileSync(userUploadPath, localTarget);
      }
      const buffer = fs.readFileSync(userUploadPath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(localTarget)) {
      const buffer = fs.readFileSync(localTarget);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("Logo not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error reading logo", { status: 500 });
  }
}
