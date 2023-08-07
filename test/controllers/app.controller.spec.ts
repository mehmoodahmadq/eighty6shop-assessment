import { AppController } from '../../src/controllers/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('getStatus', () => {
    it('should return app status', async () => {
      expect(appController.getStatus()).toEqual({
        status: 'working',
        apiVersion: '0.0.1',
      });
    });
  });
});
