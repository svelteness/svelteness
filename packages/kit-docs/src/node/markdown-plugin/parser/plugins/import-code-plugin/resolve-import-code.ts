import fs from 'fs';
import path from 'path';

import type { MarkdownParserEnv } from '../../types';
import type { ImportCodeTokenMeta } from './import-code-token-meta';

export const resolveImportCode = (
  { importPath, lineStart, lineEnd }: ImportCodeTokenMeta,
  { filePath }: MarkdownParserEnv,
): {
  importFilePath: string | null;
  importCode: string;
} => {
  let importFilePath = importPath;

  if (!path.isAbsolute(importPath)) {
    // If the importPath is relative path, we need to resolve it according to the markdown filePath.
    if (!filePath) {
      return {
        importFilePath: null,
        importCode: 'Error when resolving path',
      };
    }
    importFilePath = path.resolve(filePath, '..', importPath);
  }

  // Check file existence.
  if (!fs.existsSync(importFilePath)) {
    return {
      importFilePath,
      importCode: 'File not found',
    };
  }

  // Read file content.
  const fileContent = fs.readFileSync(importFilePath).toString();

  let importCode = fileContent.split('\n');

  if (!Number.isNaN(Number(lineStart))) {
    lineStart = Number(lineStart);
    importCode = importCode.slice(lineStart ? lineStart - 1 : lineStart, lineEnd);
  } else if (typeof lineStart === 'string') {
    importCode = importCode.slice(
      1 + importCode.findIndex((line) => line.includes(lineStart as string)),
    );
    let end = importCode.findIndex((line) => line.includes(lineStart as string));
    if (end > -1) {
      importCode = importCode.slice(0, end - 1);
    }
  }

  // Resolve partial import.
  return {
    importFilePath,
    importCode: importCode.join('\n').replace(/\n?$/, '\n'),
  };
};
