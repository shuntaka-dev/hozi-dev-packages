import * as HoziDevMarkToHtml from '../../src';

describe('convertToHoziDevHtml', () => {
  describe('link', () => {
    test('Return HTML', () => {
      const html = HoziDevMarkToHtml.convertToHoziDevHtml(
        `[see github](https://github.com/)`,
      );

      expect(html).toEqual(
        '<p><a href="https://github.com/" target="_blank">see github</a></p>\n',
      );
    });
  });

  describe('code', () => {
    test('Return HTML', () => {
      const html = HoziDevMarkToHtml.convertToHoziDevHtml(`\`\`\`bash
ls -al
\`\`\``);

      expect(html).toEqual(
        `<pre class="hozi-dev-code-block"><code class="language-bash"><span class="token function">ls</span> -al
</code></pre>
`,
      );
    });
  });
  describe('img', () => {
    describe('normal', () => {
      test('Return HTML', () => {
        const html = HoziDevMarkToHtml.convertToHoziDevHtml(
          `![img](https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f)`,
        );

        expect(html).toEqual(
          `<p><img src="https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f" alt="img"></p>
`,
        );
      });
    });
    describe('specified size', () => {
      test('Return HTML', () => {
        const html = HoziDevMarkToHtml.convertToHoziDevHtml(
          `![img](https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f =200x300)`,
        );

        expect(html).toEqual(
          `<p><img src="https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f" alt="img" width="200" height="300"></p>
`,
        );
      });
    });
  });
});
