import { Request, Response } from "express";
import {AppError} from "@/utils/AppError";
import {sign} from "jsonwebtoken";
import { authConfig } from "@/configs/auth";


class SessionsController {
  async create(request: Request, response: Response) {
  const { username, password } = request.body;

    const userfake = {
    id: "1",
    username: "Gustavo",
    password: "123456",
    role: "sale"
    }

    if(username !== userfake.username || password !== userfake.password){
      throw new AppError("Email ou senha incorretos", 401);
    }

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({role: userfake.role}, secret, {
      subject: String(userfake.id),
      expiresIn,
    }
    );

    return response.json({ token });
  }
}

export { SessionsController };
