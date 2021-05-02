import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
	id: number;
}

export async function verifyToken(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw Error('Token missing');
	}

	const [, token] = authHeader.split(' ');

	verify(token, process.env.SECRET);

	try {
		const { id } = verify(token, process.env.SECRET) as IPayload;
		request.businessCodeToken = id;
		next();
	} catch (error) {
		throw new Error('Invalid token');
	}
}
