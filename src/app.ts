import "reflect-metadata";
import  express from 'express';
import  cors from 'cors';
import  errorHandler from './core/errorHandler'; 
import ApplicationRouter from './user/userRoutes'; 
import container  from './core/inversify';



async function affichage(): Promise<void> {
  const app = express();

  
  app.disable('x-powered-by');
  


  if (process.env.NODE_ENV === 'production') {

  }


  
  app.use(cors());


  


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const router = container.get<ApplicationRouter>(ApplicationRouter);
  router.register(app);

 
  
  errorHandler(app);
 
  const PORT: number = Number(process.env.PORT) || 3890;
  app.listen(PORT, () => {
    console.log(`Running Node.js version ${process.version}`);
    console.log(`App environment: ${process.env.NODE_ENV}`);
    console.log(`App is running on port ${PORT}`);
  });
}

affichage().catch((e) => console.error(e));
