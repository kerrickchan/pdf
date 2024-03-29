import { Test, TestingModule } from '@nestjs/testing';
import { HtmlController } from './html.controller';

describe('HtmlController', () => {
  let controller: HtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HtmlController],
    }).compile();

    controller = module.get<HtmlController>(HtmlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
