#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')

const PREBUILD_CMD = 'to-public'
const pkgPath = path.resolve(process.cwd(), 'package.json')

if (!fs.existsSync(pkgPath)) {
  process.stderr.write('[to-public] package.json not found in current directory.\n')
  process.exit(1)
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

const ownVersion = require('./package.json').version
if (!pkg.devDependencies) pkg.devDependencies = {}
if (!pkg.devDependencies['@atlaxt/to-public']) {
  pkg.devDependencies['@atlaxt/to-public'] = `^${ownVersion}`
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
  process.stdout.write(`[to-public] Added @atlaxt/to-public@^${ownVersion} to devDependencies.\n`)
}

if (!pkg.scripts) pkg.scripts = {}

if (pkg.scripts.prebuild && pkg.scripts.prebuild !== PREBUILD_CMD) {
  process.stdout.write(`[to-public] prebuild already set: "${pkg.scripts.prebuild}" — skipping.\n`)
} else if (pkg.scripts.prebuild === PREBUILD_CMD) {
  process.stdout.write('[to-public] prebuild already configured.\n')
} else {
  pkg.scripts.prebuild = PREBUILD_CMD
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
  process.stdout.write('[to-public] Added prebuild script to package.json.\n')
}

require('./to-public.cjs')
