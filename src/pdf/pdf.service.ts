import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import template from 'lodash.template';
import { join } from 'path';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  private readonly htmlDir = join(__dirname, '../../..', 'public/html');

  async fromDir(htmlName: string, data = {}) {
    const html = readFileSync(
      join(
        this.htmlDir,
        htmlName.endsWith('.html') ? htmlName : `${htmlName}.html`,
      ),
      { encoding: 'utf-8' },
    );
    const merger = template(html);
    return merger(data);
  }

  async generate(html: string) {
    const engine = await puppeteer.launch({
      // executablePath: '/usr/bin/chromium', // run on linux
      // args: ['--no-sandbox'], // run with root
    });
    const [page] = await engine.pages();
    await page.setContent(html);
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({ format: 'A4' });
    await engine.close();
    return pdf;
  }
}
