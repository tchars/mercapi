import { Router } from 'express';
import jwt from 'jsonwebtoken';

const sessionRoutes = Router();

sessionRoutes.post('/', (req, res, next) => {
	if (req.body.user === 'macapa' && req.body.password === '123') {
		const id = 1;
		const token = jwt.sign({ id }, process.env.SECRET, {
			expiresIn: 300,
		});
		return res.json({ auth: true, token });
	}

	if (req.body.user === 'varejao' && req.body.password === '123') {
		const id = 2;
		const token = jwt.sign({ id }, process.env.SECRET, {
			expiresIn: 300,
		});
		return res.json({ auth: true, token });
	}

	return res.status(401).json({ message: 'Oops...' });
});

export { sessionRoutes };
