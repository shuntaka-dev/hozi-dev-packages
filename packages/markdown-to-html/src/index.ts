import MarkdownIt from 'markdown-it';
import MarkdownItBr from 'markdown-it-br';
import MarkdownItImsize from 'markdown-it-imsize';
import MarkdownItAnchor from 'markdown-it-anchor';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';
import Prismjs from 'prismjs';
import loadLanguages from 'prismjs/components/';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-ruby';

const convertToHtml = (markdown: string): string => {
  const md = new MarkdownIt({
    linkify: true,
    breaks: true,
  })
    .use(MarkdownItBr)
    .use(MarkdownItImsize)
    .use(MarkdownItAnchor, {
      level: [1, 2, 3],
      permalink: true,
    });
  md.options.highlight = (str: string, lang: string): string => {
    const prismLang = ((): Prismjs.Grammar => {
      const la = Prismjs.languages[lang];
      if (la === undefined) {
        loadLanguages([lang]);
        return Prismjs.languages[lang];
      }

      return la;
    })();
    const highlightedtext = Prismjs.highlight(str, prismLang, lang);

    return `<pre class="hozi-dev-code-block"><code class="language-${lang}">${highlightedtext}</code></pre>`;
  };

  md.renderer.rules.link_open = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    // eslint-disable-next-line
    _env: any,
    self: Renderer,
  ) => {
    const aIndex = tokens[idx].attrIndex('target');
    if (tokens[idx]['attrs']![0][1].match('http')) {
      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
      } else {
        tokens[idx]['attrs']![aIndex][1] = '_blank';
      }
    }
    return self.renderToken(tokens, idx, options);
  };

  return md.render(markdown);
};

export const convertToHoziDevHtml = (markdown: string): string => {
  return convertToHtml(markdown);
};
