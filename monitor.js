/* The purpose of this script is to provide an easy way to restart the application 
   periodically whilst also taking advantage of forever-monitor's auto-restart-on-crash.
   Usage is optional. Make sure to `npm install forever-monitor` first. */

   const forever = require("forever-monitor")

   let restartInterval = null
   let isShuttingDown = false
   let isPerformingScheduledRestart = false
   
   function logStatement(statement)
   {
       console.log(`[MONITOR] [${new Date().toUTCString()}] ${statement}`)
   }
   
   // Configure child
   const child = new (forever.Monitor)("./dist/index.js", {
       max: 3,
       minUptime: 5000,
       spinSleepTime: 5000,
   });
   child.on("exit", () =>
   {
       if (!isShuttingDown && !isPerformingScheduledRestart)
       {
           logStatement("Application has exited unexpectedly, this is likely due to a repeat failure")
           if (restartInterval)
               clearInterval(restartInterval)
       }
   });
   
   // Attach handlers to clean up child and interval before exit
   function shutDown()
   {
       try
       {
           if (restartInterval)
               clearInterval(restartInterval)
   
           if (!isShuttingDown)
           {
               isShuttingDown = true
               child.stop()
               child.kill(true).once("exit", () => logStatement("Application has gracefully shut down"))
           }
       }
       catch{ }
   }
   
   process.on("SIGINT", shutDown)
   process.on("SIGTERM", shutDown)
   
   // Set the interval for restarting the application
   async function restartApplication()
   {
       isPerformingScheduledRestart = true
       child.once("exit", () => logStatement("Application is performing scheduled restart..."))
       child.kill(true) // Kill the child
       await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5s
       child.start() // Recreate the child
       isPerformingScheduledRestart = false
   }
   
   restartInterval = setInterval(restartApplication, 24 * 60 * 60 * 1000)
   
child.start();
   