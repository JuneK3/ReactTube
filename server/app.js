const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const connect = require('./models');
const userRouter = require('./routes/user');
const videoRouter = require('./routes/video');
const subscribeRouter = require('./routes/subscriber');
const commentRouter = require('./routes/comment');
const likeRouter = require('./routes/like');

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
  ),
});
connect();

const app = express();
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('port', process.env.PORT || 8080);

app.use('/api/users', userRouter);
app.use('/api/video', videoRouter);
app.use('/api/subscriber', subscribeRouter);
app.use('/api/comment', commentRouter);
app.use('/api/like', likeRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(app.get('port'), () => {
  console.log('http://localhost:8080');
  console.log(app.get('port'), '번에서 대기중입니다.');
});
