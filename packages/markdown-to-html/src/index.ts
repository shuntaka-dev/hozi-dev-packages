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

// FIXME: Denops互換
const Prism = require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-css');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-regex');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-abap');
require('prismjs/components/prism-abnf');
require('prismjs/components/prism-actionscript');
require('prismjs/components/prism-ada');
require('prismjs/components/prism-agda');
require('prismjs/components/prism-al');
require('prismjs/components/prism-antlr4');
require('prismjs/components/prism-apacheconf');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-apex');
require('prismjs/components/prism-apl');
require('prismjs/components/prism-applescript');
require('prismjs/components/prism-aql');
require('prismjs/components/prism-c');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-arduino');
require('prismjs/components/prism-arff');
require('prismjs/components/prism-armasm');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-arturo');
require('prismjs/components/prism-asciidoc');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-aspnet');
require('prismjs/components/prism-asm6502');
require('prismjs/components/prism-asmatmel');
require('prismjs/components/prism-autohotkey');
require('prismjs/components/prism-autoit');
require('prismjs/components/prism-avisynth');
require('prismjs/components/prism-avro-idl');
require('prismjs/components/prism-awk');
require('prismjs/components/prism-basic');
require('prismjs/components/prism-batch');
require('prismjs/components/prism-bbcode');
require('prismjs/components/prism-bbj');
require('prismjs/components/prism-bicep');
require('prismjs/components/prism-birb');
require('prismjs/components/prism-bison');
require('prismjs/components/prism-bnf');
require('prismjs/components/prism-bqn');
require('prismjs/components/prism-brainfuck');
require('prismjs/components/prism-brightscript');
require('prismjs/components/prism-bro');
require('prismjs/components/prism-bsl');
require('prismjs/components/prism-cfscript');
require('prismjs/components/prism-chaiscript');
require('prismjs/components/prism-cil');
require('prismjs/components/prism-cilkc');
require('prismjs/components/prism-cilkcpp');
require('prismjs/components/prism-clojure');
require('prismjs/components/prism-cmake');
require('prismjs/components/prism-cobol');
require('prismjs/components/prism-coffeescript');
require('prismjs/components/prism-concurnas');
require('prismjs/components/prism-csp');
require('prismjs/components/prism-cooklang');
require('prismjs/components/prism-coq');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-crystal');
require('prismjs/components/prism-css-extras');
require('prismjs/components/prism-csv');
require('prismjs/components/prism-cue');
require('prismjs/components/prism-cypher');
require('prismjs/components/prism-d');
require('prismjs/components/prism-dart');
require('prismjs/components/prism-dataweave');
require('prismjs/components/prism-dax');
require('prismjs/components/prism-dhall');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-django');
require('prismjs/components/prism-dns-zone-file');
require('prismjs/components/prism-docker');
require('prismjs/components/prism-dot');
require('prismjs/components/prism-ebnf');
require('prismjs/components/prism-editorconfig');
require('prismjs/components/prism-eiffel');
require('prismjs/components/prism-ejs');
require('prismjs/components/prism-elixir');
require('prismjs/components/prism-elm');
require('prismjs/components/prism-lua');
require('prismjs/components/prism-etlua');
require('prismjs/components/prism-erb');
require('prismjs/components/prism-erlang');
require('prismjs/components/prism-excel-formula');
require('prismjs/components/prism-fsharp');
require('prismjs/components/prism-factor');
require('prismjs/components/prism-false');
require('prismjs/components/prism-firestore-security-rules');
require('prismjs/components/prism-flow');
require('prismjs/components/prism-fortran');
require('prismjs/components/prism-ftl');
require('prismjs/components/prism-gml');
require('prismjs/components/prism-gap');
require('prismjs/components/prism-gcode');
require('prismjs/components/prism-gdscript');
require('prismjs/components/prism-gedcom');
require('prismjs/components/prism-gettext');
require('prismjs/components/prism-gherkin');
require('prismjs/components/prism-git');
require('prismjs/components/prism-glsl');
require('prismjs/components/prism-gn');
require('prismjs/components/prism-linker-script');
require('prismjs/components/prism-go');
require('prismjs/components/prism-go-module');
require('prismjs/components/prism-gradle');
require('prismjs/components/prism-graphql');
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-less');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-textile');
require('prismjs/components/prism-haml');
require('prismjs/components/prism-handlebars');
require('prismjs/components/prism-haskell');
require('prismjs/components/prism-haxe');
require('prismjs/components/prism-hcl');
require('prismjs/components/prism-hlsl');
require('prismjs/components/prism-hoon');
require('prismjs/components/prism-hpkp');
require('prismjs/components/prism-hsts');
require('prismjs/components/prism-json');
require('prismjs/components/prism-uri');
require('prismjs/components/prism-http');
require('prismjs/components/prism-ichigojam');
require('prismjs/components/prism-icon');
require('prismjs/components/prism-icu-message-format');
require('prismjs/components/prism-idris');
require('prismjs/components/prism-ignore');
require('prismjs/components/prism-inform7');
require('prismjs/components/prism-ini');
require('prismjs/components/prism-io');
require('prismjs/components/prism-j');
require('prismjs/components/prism-java');
require('prismjs/components/prism-php');
require('prismjs/components/prism-javadoclike');
require('prismjs/components/prism-scala');
require('prismjs/components/prism-javadoc');
require('prismjs/components/prism-javastacktrace');
require('prismjs/components/prism-jexl');
require('prismjs/components/prism-jolie');
require('prismjs/components/prism-jq');
require('prismjs/components/prism-js-templates');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsdoc');
require('prismjs/components/prism-n4js');
require('prismjs/components/prism-js-extras');
require('prismjs/components/prism-json5');
require('prismjs/components/prism-jsonp');
require('prismjs/components/prism-jsstacktrace');
require('prismjs/components/prism-julia');
require('prismjs/components/prism-keepalived');
require('prismjs/components/prism-keyman');
require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-kumir');
require('prismjs/components/prism-kusto');
require('prismjs/components/prism-latex');
require('prismjs/components/prism-latte');
require('prismjs/components/prism-scheme');
require('prismjs/components/prism-lilypond');
require('prismjs/components/prism-liquid');
require('prismjs/components/prism-lisp');
require('prismjs/components/prism-livescript');
require('prismjs/components/prism-llvm');
require('prismjs/components/prism-log');
require('prismjs/components/prism-lolcode');
require('prismjs/components/prism-magma');
require('prismjs/components/prism-makefile');
require('prismjs/components/prism-mata');
require('prismjs/components/prism-matlab');
require('prismjs/components/prism-maxscript');
require('prismjs/components/prism-mel');
require('prismjs/components/prism-mermaid');
require('prismjs/components/prism-metafont');
require('prismjs/components/prism-mizar');
require('prismjs/components/prism-mongodb');
require('prismjs/components/prism-monkey');
require('prismjs/components/prism-moonscript');
require('prismjs/components/prism-n1ql');
require('prismjs/components/prism-nand2tetris-hdl');
require('prismjs/components/prism-naniscript');
require('prismjs/components/prism-nasm');
require('prismjs/components/prism-neon');
require('prismjs/components/prism-nevod');
require('prismjs/components/prism-nginx');
require('prismjs/components/prism-nim');
require('prismjs/components/prism-nix');
require('prismjs/components/prism-nsis');
require('prismjs/components/prism-objectivec');
require('prismjs/components/prism-ocaml');
require('prismjs/components/prism-odin');
require('prismjs/components/prism-opencl');
require('prismjs/components/prism-openqasm');
require('prismjs/components/prism-oz');
require('prismjs/components/prism-parigp');
require('prismjs/components/prism-parser');
require('prismjs/components/prism-pascal');
require('prismjs/components/prism-pascaligo');
require('prismjs/components/prism-psl');
require('prismjs/components/prism-pcaxis');
require('prismjs/components/prism-peoplecode');
require('prismjs/components/prism-perl');
require('prismjs/components/prism-phpdoc');
require('prismjs/components/prism-php-extras');
require('prismjs/components/prism-plant-uml');
require('prismjs/components/prism-plsql');
require('prismjs/components/prism-powerquery');
require('prismjs/components/prism-powershell');
require('prismjs/components/prism-processing');
require('prismjs/components/prism-prolog');
require('prismjs/components/prism-promql');
require('prismjs/components/prism-properties');
require('prismjs/components/prism-protobuf');
require('prismjs/components/prism-stylus');
require('prismjs/components/prism-twig');
require('prismjs/components/prism-pug');
require('prismjs/components/prism-puppet');
require('prismjs/components/prism-pure');
require('prismjs/components/prism-purebasic');
require('prismjs/components/prism-purescript');
require('prismjs/components/prism-python');
require('prismjs/components/prism-qsharp');
require('prismjs/components/prism-q');
require('prismjs/components/prism-qml');
require('prismjs/components/prism-qore');
require('prismjs/components/prism-r');
require('prismjs/components/prism-racket');
require('prismjs/components/prism-cshtml');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-reason');
require('prismjs/components/prism-rego');
require('prismjs/components/prism-renpy');
require('prismjs/components/prism-rescript');
require('prismjs/components/prism-rest');
require('prismjs/components/prism-rip');
require('prismjs/components/prism-roboconf');
require('prismjs/components/prism-robotframework');
require('prismjs/components/prism-rust');
require('prismjs/components/prism-sas');
require('prismjs/components/prism-sass');
require('prismjs/components/prism-shell-session');
require('prismjs/components/prism-smali');
require('prismjs/components/prism-smalltalk');
require('prismjs/components/prism-smarty');
require('prismjs/components/prism-sml');
require('prismjs/components/prism-solidity');
require('prismjs/components/prism-solution-file');
require('prismjs/components/prism-soy');
require('prismjs/components/prism-turtle');
require('prismjs/components/prism-sparql');
require('prismjs/components/prism-splunk-spl');
require('prismjs/components/prism-sqf');
require('prismjs/components/prism-squirrel');
require('prismjs/components/prism-stan');
require('prismjs/components/prism-stata');
require('prismjs/components/prism-iecst');
require('prismjs/components/prism-supercollider');
require('prismjs/components/prism-swift');
require('prismjs/components/prism-systemd');
require('prismjs/components/prism-t4-templating');
require('prismjs/components/prism-t4-cs');
require('prismjs/components/prism-vbnet');
require('prismjs/components/prism-t4-vb');
require('prismjs/components/prism-tap');
require('prismjs/components/prism-tcl');
require('prismjs/components/prism-tt2');
require('prismjs/components/prism-toml');
require('prismjs/components/prism-tremor');
require('prismjs/components/prism-typoscript');
require('prismjs/components/prism-unrealscript');
require('prismjs/components/prism-uorazor');
require('prismjs/components/prism-v');
require('prismjs/components/prism-vala');
require('prismjs/components/prism-velocity');
require('prismjs/components/prism-verilog');
require('prismjs/components/prism-vhdl');
require('prismjs/components/prism-vim');
require('prismjs/components/prism-visual-basic');
require('prismjs/components/prism-warpscript');
require('prismjs/components/prism-wasm');
require('prismjs/components/prism-web-idl');
require('prismjs/components/prism-wgsl');
require('prismjs/components/prism-wiki');
require('prismjs/components/prism-wolfram');
require('prismjs/components/prism-wren');
require('prismjs/components/prism-xeora');
require('prismjs/components/prism-xml-doc');
require('prismjs/components/prism-xojo');
require('prismjs/components/prism-xquery');
require('prismjs/components/prism-yang');
require('prismjs/components/prism-zig');
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
