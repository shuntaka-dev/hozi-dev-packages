import MarkdownIt from 'markdown-it';
import MarkdownItBr from 'markdown-it-br';
import MarkdownItImsize from '@steelydylan/markdown-it-imsize';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItImageLazyLoading from 'markdown-it-image-lazy-loading';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItPlayground from 'markdown-it-playground';
import MarkdownItPlantuml from 'markdown-it-plantuml';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

declare global {
  // @ts-ignore
  var Prism: {
    disableWorkerMessageHandler: boolean;
  };
}

(global as any).Prism = { disableWorkerMessageHandler: true };

const Prism = require('prismjs');
import loadLanguages from 'prismjs/components/';
import * as ContainerOption from './mdOption/container';

const convertToHtml = (markdown: string): string => {
  const md = new MarkdownIt({
    linkify: true,
    breaks: true,
  })
    .use(MarkdownItBr)
    .use(MarkdownItImsize)
    .use(MarkdownItImageLazyLoading)
    .use(MarkdownItPlantuml)
    .use((md) => {
      // costom ``` rule
      const fenceDefaultRenderRule = md.renderer.rules.fence!; // TODO delete non-null assertion
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const [lang, filename] = tokens[idx].info.split(/:/); // tokens.info => "bash: test.sh"
        tokens[idx].info = lang; // delete fileName
        const html = fenceDefaultRenderRule(tokens, idx, options, env, self); // render markdown exclude fileName
        if (filename === undefined) {
          return `<div class="code-block-container">${html}</div>`;
        }

        const filenameHtml = `<div class="code-block-filename-container"><span class="code-block-filename">${md.utils.escapeHtml(
          filename,
        )}</span></div>`;

        return `<div class="code-block-container">${filenameHtml}${html}</div>`;
      };
    })
    .use(MarkdownItPlayground)
    .use(MarkdownItContainer, 'details', ContainerOption.details)
    .use(MarkdownItContainer, 'message', ContainerOption.message)
    .use(MarkdownItAnchor, {
      level: [1, 2, 3, 4],
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '',
      permalinkClass: 'anchor-link',
    });
  md.options.highlight = (str: string, lang: string): string => {
    const prismLang = ((): Prism.Grammar => {
      const la = Prism.languages[lang];
      if (la === undefined) {
        loadLanguages([lang]);
        return Prism.languages[lang];
      }

      return la;
    })();
    const highlightedtext = Prism.highlight(str, prismLang, lang);

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

    const relIndex = tokens[idx].attrIndex('rel');
    if (relIndex < 0) {
      tokens[idx].attrPush(['rel', 'noopener']);
    } else {
      tokens[idx]['attrs']![relIndex][1] = 'noopener';
    }

    return self.renderToken(tokens, idx, options);
  };

  return md.render(markdown);
};

const convertToHoziDevHtml = (markdown: string): string => {
  return convertToHtml(markdown);
};

export default convertToHoziDevHtml;
