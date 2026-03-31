# @atlaxt/to-public

Reads your `package.json` and writes a sanitised, public-safe `public/meta.json` — automatically, before every build.

## Setup

```bash
npx @atlaxt/to-public
```

That's it. This command:

1. Adds `@atlaxt/to-public` to `devDependencies` (if not already there)
2. Adds `"prebuild": "to-public"` to your `package.json`
3. Generates `public/meta.json` from your `package.json`

Output includes a `buildDate` (ISO 8601) generated at build time.

## Configuration

Edit the `CONFIG` block at the top of `to-public.cjs` in your project:

```js
const CONFIG = {
  outputPath: 'public/meta.json',

  // Remove specific fields
  exclude: ['scripts', 'devDependencies'],

  // Or keep only specific fields (takes priority over exclude)
  include: ['name', 'version', 'description', 'homepage'],
}
```

## License

MIT — [Atlas Yigit Aydin](https://atlaxt.me)
