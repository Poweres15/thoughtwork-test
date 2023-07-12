# thoughtwork-test

automation tests for thoughtwork assessment

# How to use

1. Git clone the project `git@github.com:Poweres15/thoughtwork-test.git`
2. Run `npm install`
3. Run `npm playwright install --with-deps` to make sure the browers got installed
4. To run all the tests with headless-mode, please run `npx playwright test`
5. To run with debug mode, please run `PWDEBUG=1 npm playwright test`.
6. To open allure report `npm allure:open`

# How to run with specific test scope

Performace testing
`npx playwright test --grep @performace --repeat-each=3`

API and Backend testing
`npx playwright test --grep @backend --project=chromium`

functional tesing
`npx playwright test --grep @functional`
