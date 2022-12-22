import markdownToHtml from '../../src';

describe('convertToHoziDevHtml', () => {
  describe('link', () => {
    test('Return HTML', () => {
      const html = markdownToHtml(`[see github](https://github.com/)`);

      expect(html).toEqual(
        '<p><a href="https://github.com/" target="_blank" rel="noopener">see github</a></p>\n',
      );
    });
  });

  describe('code', () => {
    test('Return HTML', () => {
      const html = markdownToHtml(`\`\`\`bash
ls -al
\`\`\``);

      expect(html)
        .toEqual(`<div class=\"code-block-container\"><pre class=\"hozi-dev-code-block\"><code class=\"language-bash\"><span class=\"token function\">ls</span> <span class=\"token parameter variable\">-al</span>
</code></pre>
</div>`);
    });

    describe('& fileName', () => {
      test('Return HTML', () => {
        const html = markdownToHtml(`\`\`\`bash: test.sh
ls -al
\`\`\``);

        expect(html).toEqual(
          `<div class="code-block-container"><div class="code-block-filename-container"><span class="code-block-filename"> test.sh</span></div><pre class="hozi-dev-code-block"><code class="language-bash"><span class="token function">ls</span> <span class="token parameter variable">-al</span>
</code></pre>
</div>`,
        );
      });
    });
  });

  describe('ancher', () => {
    test('Return HTML', () => {
      const html = markdownToHtml('# aaaa');

      expect(html).toEqual(
        `<h1 id="aaaa"><a class="anchor-link" href="#aaaa" rel="noopener"></a> aaaa</h1>\n`,
      );
    });
  });

  describe('img', () => {
    describe('normal', () => {
      test('Return HTML', () => {
        const html = markdownToHtml(
          `![img](https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f)`,
        );

        expect(html).toEqual(
          '<p><img src="https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f" alt="img" loading="lazy"></p>\n',
        );
      });
    });

    describe('specified size', () => {
      test('Return HTML', () => {
        const html = markdownToHtml(
          `![img](https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f =200x300)`,
        );

        expect(html).toEqual(
          '<p><img src="https://gyazo.com/f4d63480f0146b89c8824b57dd146b9f" alt="img" width="200" height="300" loading="lazy"></p>\n',
        );
      });
    });
  });

  describe('summary', () => {
    describe('simple case', () => {
      test('Return HTML', () => {
        const html = markdownToHtml(
          '::: details sourceCode\nhere be dragons\n:::',
        );

        expect(html).toEqual(
          '<details><summary>sourceCode</summary><div class="details-content"><p>here be dragons</p>\n</div></details>\n',
        );
      });
    });
  });

  describe('message', () => {
    describe.each`
      className
      ${'info'}
      ${'warn'}
      ${'error'}
      ${'tips'}
    `('classs=$classの場合', ({ className }) => {
      test(`Return class="message ${className}" HTML`, () => {
        const html = markdownToHtml(
          `::: message ${className}\nhere be dragons\n:::`,
        );

        expect(html)
          .toEqual(`<div class="message ${className}"><p>here be dragons</p>
</div>
`);
      });
    });
  });

  describe('embeded', () => {
    describe('codepen', () => {
      const html = markdownToHtml(
        '@[codepen](https://codepen.io/shuntaka9576/embed/QWdBzbX)',
      );

      expect(html).toEqual(
        `<div class="block-embed block-embed-service-codepen"><iframe type="text/html" src="https://codepen.io/shuntaka9576/embed/QWdBzbX" frameborder="0" width="100%" height="300" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>
`,
      );
    });
  });

  describe('plantuml', () => {
    test('Return uml', () => {
      const html = markdownToHtml(`@startuml
Bob -> Alice : hello
@enduml`);

      expect(html).toEqual(
        `<img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80" alt="uml diagram" loading="lazy">
`,
      );
    });
  });
});
