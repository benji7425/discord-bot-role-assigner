# Discord bot core

Core code for connection and command handling for my Discord bots.  
This is not actually a Discord bot. To learn about some of my available Discord bots please visit [my website](https://benji7425.github.io/)  
This code is included in the repo for each bot using [git subrepo](https://github.com/ingydotnet/git-subrepo), which I prefer over submodules and subtrees.

This code does not function on it's own, it simply provides common functionality my Discord bots can make use of.
To test/modify this code, it needs to be run in the context of an actual bot.
A good candidate is my [template project](https://github.com/benji7425/discord-bot-template), which should run and connect just fine, just won't do much.

## Built with
- [discord.js](https://discord.js.org/#/)
- [NeDB](https://github.com/louischatriot/nedb)
- [camo](https://github.com/scottwrobinson/camo)

## Contributing

The easiest way to get setup would be a fork of this repo, and the fork of a bot to use as a development context.
I suggest using my [template project](https://github.com/benji7425/discord-bot-template) as a development context, along with [git subrepo](https://github.com/ingydotnet/git-subrepo) to push back to your core fork.  
If you are uncomfortable using git subrepo, you could just as easily copy/paste your child `core` directory back into your fork.

My [template project](https://github.com/benji7425/discord-bot-template) has more in-depth details about how to setup and test.

If you have a completed change, please submit a pull request from your `core` fork back to this repo.

Whilst this is very easy to use once you know how, I appreciate this might be a little tricky if you aren't familiar with developing in this way.
Feel free to contact me if you would like assistance. Find contact details [here](https://benji7425.github.io/contact).
