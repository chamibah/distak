import express, { Application, Request, Response, NextFunction } from 'express';
import { NotFoundError, ApplicationError } from '../common/appErrors';

import log from './logger';




export default function (app: Application) {

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError('You are lost');
});


app.use((error: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApplicationError) {
    log.error(error?.message, error.stack);
    if (error?.code) {
      return res.status(error.code).send(error.message);
  } else {
      
      return res.status(500).send("An unexpected error occurred");
  }
  }
  next(error);
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const userString = 'unknown user';

  if (err) {
    log.error(`${req.method} ${req.path}: Unhandled Redis error ${userString}. ${err.message}`);
    if (!res.headersSent) {
      return res.sendStatus(500);
    }
  }
  next(err);
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 500;
  res.end(err.message + '\n');
})
}
