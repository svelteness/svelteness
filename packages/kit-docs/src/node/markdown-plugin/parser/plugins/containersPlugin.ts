import type { PluginWithOptions } from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import container from 'markdown-it-container';

import { titleToSnakeCase } from '../../../utils/string';
import { isString } from '../../../utils/unit';
import type { MarkdownComponents, MarkdownParser } from '../types';

const propsRE = /\|?(.*?)=(.*?)(?=(\||$))/g;
const bodyRE = /\((.*?)\)(?:=)(.*)/;
const tagRE = /tag=(.*?)(?:&|$)/;
const slotRE = /slot=(.*?)(?:&|$)/;

function renderDefault(componentName: string) {
  return (tokens: Token[], idx: number) => {
    const token = tokens[idx];

    const props: string[] = [];
    const body: string[] = [];

    for (const [propMatch, prop, value] of token.info.matchAll(propsRE)) {
      if (bodyRE.test(propMatch)) {
        const [_, content] = propMatch.match(bodyRE) ?? [];
        const tag = propMatch.match(tagRE)?.[1];
        const slot = propMatch.match(slotRE)?.[1];
        if (isString(tag) && isString(content)) {
          body.push(
            [`<${tag}${isString(slot) ? ` slot="${slot}"` : ''}>`, content, `</${tag}>`].join('\n'),
          );
        }
      } else if (isString(prop) && isString(value)) {
        props.push(`${prop}=${value}`);
      }
    }

    if (token.nesting === 1) {
      return `<${componentName} ${props.join(' ')}>\n ${body.join('\n ')}`;
    } else {
      return `</${componentName}\n`;
    }
  };
}

export const containersPlugin: PluginWithOptions<MarkdownComponents> = (
  parser: MarkdownParser,
  components = {},
) => {
  for (const { name: componentName, container: options } of components.custom ?? []) {
    const name: string = options?.name ?? titleToSnakeCase(componentName);
    const marker: string = options?.marker ?? ':';
    const render = options?.renderer?.(componentName) ?? renderDefault(componentName);
    parser.use(container(name, { marker, render }));
  }
};
