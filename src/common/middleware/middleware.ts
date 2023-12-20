import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken';

export class TokenVerificationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (token) {
            const cleanToken = token.replace('Bearer', '').trim();
            jwt.verify(cleanToken, 'final-project-secret-key', function (err, _) {
                if (err) {
                    res.writeHead(401, { 'content-type': 'application/json' })
                    res.write(JSON.stringify({
                        msg: 'Authorization is required',
                    }))
                    res.end()
                }
                next()
            });
        } else {
            res.writeHead(401, { 'content-type': 'application/json' })
            res.write(JSON.stringify({
                msg: 'Authorization is required',
            }))
            res.end()
        }

    }
}