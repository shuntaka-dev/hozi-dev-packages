import { escapeHtml } from 'markdown-it/lib/common/utils';
import Token from 'markdown-it/lib/token';

const detailsRegExp = /^details\s+(.*)$/;
export const details = {
  validate: (params: string): RegExpMatchArray | null => {
    return params.trim().match(detailsRegExp);
  },
  render: (tokens: Token[], idx: number): string => {
    const matches = tokens[idx].info.trim().match(detailsRegExp);
    if (tokens[idx].nesting === 1 && matches) {
      return (
        '<details><summary>' +
        escapeHtml(matches[1]) +
        '</summary><div class="details-content">'
      );
    } else {
      return '</div></details>\n';
    }
  },
};

const messageRegExp = /^message\s*(.*?)$/;
export const message = {
  validate: (params: string): RegExpMatchArray | null => {
    return params.trim().match(messageRegExp);
  },
  render: (tokens: Token[], idx: number): string => {
    const matches = tokens[idx].info.trim().match(messageRegExp);

    if (tokens[idx].nesting === 1 && matches) {
      // opening tag
      return '<div class="message ' + escapeHtml(matches[1]) + '">';
    } else {
      // closing tag
      return '</div>\n';
    }
  },
};
