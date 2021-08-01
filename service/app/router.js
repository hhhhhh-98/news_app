'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/register', controller.index.register);
  router.post('/resetpassword', controller.index.resetpassword);
  router.post('/uploadImg', controller.index.uploadImage);
  router.get('/getImg', controller.index.getImg);
  router.post('/updateUser', controller.index.updateUser);
  router.post('/feedBack', controller.index.insertFeedBack);

};
