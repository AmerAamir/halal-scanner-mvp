#!/usr/bin/env node
import { validateAll } from '@halalscanner/rules';

async function run() {
  try {
    await validateAll();
    console.log('Rules validation succeeded.');
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
}

run();