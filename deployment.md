**I am no longer actively maintaining my Discord bot projects. They should continue to work, but I can't guarantee that I'll fix them if future Discord updates cause issues.**

#  Discord bot deployment

**Attention!** This guide may look scary because it is long, but this is just because it covers 3 different deployment methods for different expertise levels.  
If you find long guides scary please watch [my tutorial video on YouTube](https://www.youtube.com/watch?v=DjQayKgcjGM) for a step-by-step demonstration instead.

Continue reading for a written overview.

## Choosing a deployment method

There are 3 supported deployment options depending on your level of experience and need for customisation. If you don't know what you are doing you only need to read the beginner guide.

- **Complete the [Choosing a database](#Choosing-a-database) and [Discord integration](#Discord-integration) steps first, then choose your deployment method**

- [Beginner: Heroku](#Heroku-Beginner)
  - Advantages: Free, easy, no server configuration
  - Disadvantages: No customisation, no access to logs, requires external database
  - Recommended if you don't know what a cloud server or VPS is
- [Intermediate: Docker](#Docker-Intermediate)
  - Advantages: Little setup required, pre-configured, somewhat customisable
  - Disadvantages: Requires your own cloud server with Docker installed
  - Recommended if you want a set-and-forget cloud deployment
- [Advanced: Manual](#Manual-Advanced)
  - Advantages: Full access to all config files, logs, and code
  - Disadvantages: Requires expertise and your own cloud server
  - Recommended if you want full control and know what you're doing

## Choosing a database

If you don't know what a database is or what you might do with one the easiest thing to do is just follow [my tutorial video on YouTube](https://www.youtube.com/watch?v=DjQayKgcjGM). This will take you step-by-step through an easy and free database you can set up with [MongoDB Atlas' free tier](https://www.mongodb.com/cloud/atlas).  
If you have a basic understanding of databases, read on.

My Discord bots use [NeDB](https://github.com/louischatriot/nedb) by default, which is a simple database that will store data in a folder on the local machine. This will be sufficient for most users, and is supported with both Docker and Manual deployments. Unfortunately due to technical limitations with Heroku it is not supported with this option.

If you are deploying to Heroku you will need a MongoDB database, but you can also choose to use a MongoDB database with both Docker and Manual deployments. A properly hosted database will be more resistant to data loss and better at handling large numbers of users than a local database. You can easily set up a free MongoDB database with [MongoDB Atlas' free tier](https://www.mongodb.com/cloud/atlas), or you can use your own provider if you know what you are doing.

## Discord integration

I recommend that you watch [my tutorial video on YouTube](https://www.youtube.com/watch?v=DjQayKgcjGM) on how to set this up if you are unsure.

1. Navigate to the [Discord developer dashboard](https://discordapp.com/developers/applications/)
2. Create a New Application
3. Navigate to the 'Bot' tab and click 'Add bot'
4. Copy the token under the 'Token' header; you will need this for deployment
5. Navigate to the 'OAuth2' tab
6. Under 'scopes' tick 'bot',
7. Under 'bot permissions' tick the permissions listed in the bot readme
8. Copy the long URL provided into a browser tab to invite your bot to your Discord server

## Heroku (Beginner)

I recommend that you watch [my tutorial video on YouTube](https://www.youtube.com/watch?v=DjQayKgcjGM) on how to set this up if you are unsure.

1. Create your Discord bot to get your token
2. Create your database to get your connection string
3. Click the 'Deploy to Heroku' button in the bot readme
4. Follow the setup steps

## Docker (Intermediate)

Set up a cloud server with [Docker](https://www.docker.com/) installed, I recommend [this Digital Ocean droplet](https://marketplace.digitalocean.com/apps/docker), then run the command below.

### Recommended command

`docker run -d -e TOKEN="your-token-here" -v /path/to/database:/app/nedb-data brhiggins/discord-role-assigner`

- Replace `your-token-here` with your [Discord bot token](#Discord-integration)
- Replace `/path/to/database` with a path to an  *absolute folder* on the same machine

### Customised command

`docker run [OPTIONS] repository-name`

| Option                                     | What                                                     | When to use                                                  |
| ------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| `-e TOKEN="your-token-here"`               | Discord bot token string                                 | If you are not providing your own config.json                |
| `-e DB_STRING="your-db-string-here"`       | Remote database connection string                        | If you do not want to use the local NeDB database            |
| `-v /path/to/data:/app/nedb-data`          | Mount the local database file to a storage location      | If you want to use a local database                          |
| `-v /path/to/logs:/app/logs`               | Mount the logs folder to a storage location              | If you want to gain access to the application log files      |
| `-v /path/to/config.json:/app/config.json` | Mount a custom config.json file for use in the container | If you want to provide your own config.json file for the bot to use |

## Manual (Advanced)

By default manual deployment will use a local NeDB database. Please see [Choosing a database](#Choosing-a-database) to learn more. You can change the connection string in your config.json file to connect to a different database.

1. Install [Node.js v10](https://nodejs.org/en/)
2. Clone the repository with git, or download and extract the zip file from the GitHub repo releases page
    - If you clone with git make sure you `git reset --hard vX.Y.Z` to the latest release tag as master isn't always production ready
3. Create a new file *config.json* from a copy of *config.sample.json* and paste your bot token in the token field (between the quotes)
4. Optionally change the other settings in your *config.json* file to customise behaviour
5. Run `npm run full-start` to compile and run the bot
    - If you see yellow 'WARN' messages about peer dependencies, you can safely ignore these

Manual installation has the option to run the bot with a 24hr auto restart as well as automatically restarting on crash. If you want to use these features you need to launch the bot in a slightly different way.

1. Follow steps 1-4 above
2. Run `npm install forever-monitor`, this is used to restart the bot automatically if it crashes
3. Use `node monitor.js` to launch the bot, this contains the daily restart functionality
