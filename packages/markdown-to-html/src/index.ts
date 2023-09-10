import MarkdownIt from 'markdown-it';
import MarkdownItBr from 'markdown-it-br';
import MarkdownItImsize from '@steelydylan/markdown-it-imsize';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItImageLazyLoading from 'markdown-it-image-lazy-loading';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItPlantuml from 'markdown-it-plantuml';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

declare global {
  // @ts-ignore
  var Prism: {
    disableWorkerMessageHandler: boolean;
  };
}

// Node.js、ブラウザ、WebWorkerの各環境で動作するようにチェック
if (typeof window !== 'undefined') {
  // ブラウザ環境
  (window as any).Prism = { disableWorkerMessageHandler: true };
} else if (typeof global !== 'undefined') {
  // Node.js環境
  (global as any).Prism = { disableWorkerMessageHandler: true };
} else if (typeof self !== 'undefined') {
  // WebWorker環境
  (self as any).Prism = { disableWorkerMessageHandler: true };
}

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
      md.renderer.rules.custom = function tokenizeBlock(tokens, idx) {
        const { tag, arg }: any = tokens[idx].info;

        if (tag === 'sd') {
          const [slideId, sliedNo, aspectRetio, dataRetio] = arg.split(',');

          if (
            slideId != null &&
            sliedNo != '' &&
            aspectRetio != null &&
            dataRetio != null
          ) {
            return `<div class="block-embed-service-speakerdeck"><iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/${slideId}?slide=${sliedNo}" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: ${aspectRetio};" data-ratio="${dataRetio}"></iframe></div>\n`;
          } else {
            return `<div class="block-embed-service-speakerdeck"><iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/${slideId}" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: ${aspectRetio};" data-ratio="${dataRetio}"></iframe></div>\n`;
          }
        } else if (tag === 'codepen') {
          return `<div class="block-embed block-embed-service-codepen"><iframe type="text/html" src="${arg}" frameborder="0" width="100%" height="300" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>
`;
        }

        return '';
      };
      md.block.ruler.before(
        'fence',
        'custom',
        function customEmbed(state, startLine, endLine, silent) {
          const startPos = state.bMarks[startLine] + state.tShift[startLine];
          const maxPos = state.eMarks[startLine];
          const block = state.src.slice(startPos, maxPos);
          const pointer = { line: startLine, pos: startPos };

          if (state.src.charCodeAt(pointer.pos) !== 0x40 /* @ */) {
            return false;
          }

          const embedRE = /@\[([\w-]+)\]\((.+)\)/im;
          const match = embedRE.exec(block);

          if (!match || match.length < 3) {
            return false;
          }

          const [all, tag, arg] = match;

          pointer.pos += all.length;

          if (pointer.line >= endLine) return false;
          if (!silent) {
            const token = state.push('custom', 'div', 0);
            token.markup = state.src.slice(startPos, pointer.pos);
            // eslint-disable-next-line
            token.info = { arg, tag } as any;
            token.block = true;
            token.map = [startLine, pointer.line + 1];
            state.line = pointer.line + 1;
          }

          return true;
        },
        { alt: ['paragraph', 'reference', 'blockquote', 'list'] },
      );
    })
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
