import fs from 'fs'
import { exec } from 'child_process'
// import { installDependencies } from './index'

const pathToInstallDependencies = './packages/install-dependencies/'
const runInstallDependencies = `ts-node ${pathToInstallDependencies}src/index.ts run`
const configFixtureDirectory = `${pathToInstallDependencies}__fixtures__/`
const standardTestPackageJson = `test.package.json`
const testDirectory = `${pathToInstallDependencies}tests/`
const standardTestDirectory = 'standard/'

/**
 * @todo write more tests!
 * const ignoreTestPackageJson = `test.ignore.package.json`
 * const includeTestPackageJson = `test.include.package.json`
 * const allTestPackageJson = `test.all.package.json`
 */

const cleanUpTestDirectory = () => exec(`rm -rf ${testDirectory}`)

describe('install-dependencies', () => {
  it('installed dependencies', async (done) => {
    const config = `${configFixtureDirectory}${standardTestPackageJson}`
    const dest = `${testDirectory}${standardTestDirectory}`
    const script = `${runInstallDependencies} ${config} ${dest}`
    await exec(script, () => {
      const isTestFolderEmpty = fs.readdirSync(dest)
      expect(isTestFolderEmpty.length).toEqual(2)
      cleanUpTestDirectory()
      done()
    })
  })
})
