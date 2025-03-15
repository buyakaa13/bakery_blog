import express, {json} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import favicon from 'serve-favicon';
import {join} from 'node:path';
import router from './routes/router';
import { default_error, no_route_found_handler } from './controller/post_controller';

const application = express();

application.disable('x-powered-by');
application.disable('etag');

application.use(morgan('dev'));
application.use(cors());
application.use(favicon(join(__dirname, 'images', 'favicon.png')));

application.use('/images', express.static(join(__dirname, 'images')));
application.use(json());

application.use('/posts', router);

application.use(no_route_found_handler);
application.use(default_error);

application.listen(3000, () => console.log('Listening on 3000'));