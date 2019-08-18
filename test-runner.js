console.log("No tests yet!")

// const { TapBark } = require("tap-bark");
// const { TestSet, TestRunner } = require("alsatian");

// (async () =>
// {
//     const testSet = TestSet.create();
//     testSet.addTestsFromFiles('./dist/**/*.spec.js');

//     const testRunner = new TestRunner();

//     testRunner.outputStream
//         .pipe(TapBark.create().getPipeable())
//         .pipe(process.stdout);

//     await testRunner.run(testSet);
// })().catch(e =>
// {
//     console.error(e);
//     process.exit(1);
// });