---
description: Guide to using all Markdown extensions and components.
---

# Extensions

In this section, we'll look at at the Markdown extensions and components available to you
when writing documentation.

## Header Anchors

Header tags such as `# Heading 1`, `## Heading 2`, and so on will automatically include
anchor tags. When clicked the browser will jump to that heading. Try hovering over any heading
on this page and clicking the `#`.

## Links

Links will be mapped to the correct slug and can be set in any of the following ways:

```md
[home](/index.html)
[foo index](/foo/)
[heading](#heading)
[relative file with .md ext](../foo/bar.md)
[relative file with .html ext](../foo/bar.html)
[external](https://kitdocs.vercel.app)
```

## Frontmatter

[YAML](https://yaml.org) frontmatter is supported.

```md
---
title: Page Title
description: My awesome page description.
---

Access it via the store: {$frontmatter.description}

...
```

## Table of Contents

The following will output a list containing all the headings on the page.

```md copy
[[toc]]
```

## GitHub Tables

```md copy
| Column 1     | Column 2 |      Column 3 |
| ------------ | :------: | ------------: |
| left-aligned | centered | right-aligned |
| left-aligned | centered | right-aligned |
| left-aligned | centered | right-aligned |
```

| Column 1     | Column 2 |      Column 3 |
| ------------ | :------: | ------------: |
| left-aligned | centered | right-aligned |
| left-aligned | centered | right-aligned |
| left-aligned | centered | right-aligned |

## Admonitions

### Note

```md copy
:::admonition type="note"
This is a note.
:::
```

:::admonition type="note"
This is a note.
:::

### Info

```md copy
:::admonition type="info"
This is informational.
:::
```

:::admonition type="info"
This is informational.
:::

### Tip

```md copy
:::admonition type="tip"
This is a tip.
:::
```

:::admonition type="tip"
This is a tip.
:::

### Warning

```md copy
:::admonition type="warning"
This is a warning.
:::
```

:::admonition type="warning"
This is a warning.
:::

### Danger

```md copy
:::admonition type="danger"
This is dangerous.
:::
```

:::admonition type="danger"
This is dangerous.
:::

### Experimental

```md copy
:::admonition type="experimental"
This is experimental.
:::
```

:::admonition type="experimental"
This is experimental.
:::

## Emojis

You can find a list of all available emojis [here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

```md copy
Emojis are awesome :tada:
```

Emojis are awesome :tada:

## Yes/No

```md copy
:::yes
You should do this.
:::

:::no
You should NOT do this.
:::
```

:::yes
You should do this.
:::

:::no
You should NOT do this.
:::

## Steps

`````md copy
:::steps

!!!step title="Step 1"|description="This is a description for step 1."

```js
const step = 1;
```

!!!

!!!step title="Step 2"|(slot=description)=This is a description for step 2 with markdown `code`.

```js
const step = 2;
```

!!!

:::

:::steps

!!!step title="Step 1"|description="This is a description for step 1."

```js
const step = 1;
```

!!!

!!!step title="Step 2"|(slot=description)=This is a description for step 2 with markdown syntax `code`.

```js
const step = 2;
```

!!!

:::

### Vertical Orientaton

````md copy
:::steps

!!!step title="Step 1"|description="This is a description for step 1."|orientation="vertical"

```js
const step = 1;
```

!!!

:::
````
`````

:::steps

!!!step title="Step 1"|description="This is a description for step 1."|orientation="vertical"

```js
const step = 1;
```

!!!

:::

## Code Fence

You can find all supported languages [here](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages).

### Default

````md
```js
const foo = 1;
```
````

```js
const foo = 1;
```

### Title

````md
```js title="file.js"
const foo = 1;
```
````

```js title="file.js"
const foo = 1;
```

### Slot

````md
```js slot="usage"
const foo = 1;
```

```js slot="example"
const bar = 1;
```
````

### Terminal

````md
```bash
npm create svelte docs
cd docs
```
````

```bash
npm create svelte docs
cd docs
```

### Copy

````md
```js copy
const foo = 1;
```
````

```js copy
const foo = 1;
```

### Line Numbers

````md
```js lineNumbers
const foo = 1;

function bar() {
  // ...
}
```
````

```js lineNumbers
const foo = 1;

function bar() {
  // ...
}
```

### Line Highlights

You can highlight specified lines of your code blocks by adding line markers to your fenced code
blocks.

- Single Line: `{1}`
- Line Ranges: `{2-6}`
- Multiple Lines: `{2,4-10,12,14,16-20}`

````md
```js {1,3-5}
const foo = 1;

function bar() {
  // ...
}
```
````

```js {1,3-5}
const foo = 1;

function bar() {
  // ...
}
```

### Copy Highlight

````md
```js copyHighlight{3-5}
const foo = 1;

function bar() {
  // ...
}
```
````

```js copyHighlight{3-5}
const foo = 1;

function bar() {
  // ...
}
```

### Copy Steps

This will step through the code line by line, highlight it and copy it. Each time you tap the
copy button it'll move to the next line.

````md
```bash copySteps
npm create svelte docs
cd docs
npm i
```
````

```bash copySteps
npm create svelte docs
cd docs
npm i
```

### Copy Highlight Steps

This will step through each of the highlighted ranges and copy them one by one. Each time you tap the
copy button it'll move to the next highlighted range.

````md
```js copySteps{1,3-5}
const foo = 1;

function bar() {
  // ...
}
```
````

```js copySteps{1,3-5}
const foo = 1;

function bar() {
  // ...
}
```

### Multiple Options

Provide multiple options by separating them with a vertical bar `|`:

````md
```js title="file.js"|copy|lineNumbers{1,3-5}
const foo = 1;

function bar() {
  // ...
}
```
````

```js title="file.js"|copy|lineNumbers{1,3-5}
const foo = 1;

function bar() {
  // ...
}
```

## Imported Code Fence

You can import code blocks from files with the following syntax:

```md
@[code](../foo.js)
```

If you want to partially import the file, you can do it via line numbers:

```md
@[code{1-10}](../foo.js)
```

Or via a token that surrounds the desired code snippet:

```md
@[code{snippet-1}](../foo.js)
```

```js title=foo.js

willNotShow();

// start of snippet-1

if(...) {
  doSomething();
}

// end of snippet-1

thisWontShowEither();
```

The code language is inferred from the file extension, however, you can specify it like so:

```md
@[code js](../foo.js)
```

In fact, the second part inside the `[]` will be treated as the mark of the code fence, so it
supports all the syntax mentioned above:

```md
@[code js|title=file.js|copy{2,4-5}](../foo.js)
```