import { Body, Controller, Inject, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';
import { PdfService } from './pdf.service';

@ApiTags('pdf')
@Controller('pdf')
export class PdfController {
  @Inject()
  private readonly pdfService: PdfService;

  @ApiConsumes('text/plain')
  @ApiParam({
    name: 'filename',
    example: 'html.pdf',
    description: 'filename of pdf',
  })
  @ApiBody({
    schema: {
      type: 'string',
    },
    description: 'html to generate pdf',
  })
  @Post('generate/:filename')
  async generate(
    @Param('filename') filename: string,
    @Body() html: string,
    @Res() res: Response,
  ) {
    const pdf = await this.pdfService.generate(html);
    filename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}`,
    });
    Readable.from(pdf).pipe(res);
  }
}
