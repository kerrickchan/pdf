import {
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { HtmlService } from './html.service';

@ApiTags('html')
@Controller('html')
export class HtmlController {
  @Inject()
  private readonly htmlService: HtmlService;

  @Get('/list')
  listAllHtmls() {
    return this.htmlService.listAllHtmls();
  }

  @ApiParam({ name: 'name', example: 'index.html' })
  @Get(':name')
  listHtml(
    @Req() { params: { name = 'index.html' } }: Request,
    @Res() res: Response,
  ) {
    res.send(this.htmlService.listHtml(name));
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        html: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('html'))
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  uploadTemplate(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/html' })],
      }),
    )
    html: Express.Multer.File,
  ) {
    return this.htmlService.uploadHtml(html);
  }
}
