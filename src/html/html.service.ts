import { Injectable } from '@nestjs/common';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class HtmlService {
  private readonly htmlDir = join(__dirname, '../../..', 'public/html');

  listAllHtmls() {
    return readdirSync(this.htmlDir).filter((file) => file.endsWith('.html'));
  }

  listHtml(name: string) {
    return readFileSync(
      join(this.htmlDir, `${name}${name.endsWith('.html') ? '' : '.html'}`),
      { encoding: 'utf8' },
    );
  }

  uploadHtml(html: Express.Multer.File) {
    return writeFileSync(join(this.htmlDir, html.originalname), html.buffer);
  }
}
