# yuuto-bot

Yuuto bot is meant to be a collaboration of the [Camp Buddy Official Fan Server](https://discord.gg/hh2xDTV) members, completely community driven and open source. The bot's idea came form an increasing amount of tech oriented campers asking to see or contribute to _Super Hiro_ (the server's custom administrative bot).

## Project setup

The Yuuto bot will be written in JavaScript and the repository hosted on GitHub, as this seemed the best way to make the project accessible and easy for our campers to chip in on.

### Bot application

The bot is developed using JavaScript, following the ES11 standards. It is run on Node v13+ and uses Discord.js v12.0.1.  
Once you have cloned the repository on your local machine, make sure to download / update the packages from `package.json` if you haven't, as they will be needed in development.

### Why JavaScript

JavaScript was chosen, as the Discord.js library is outstanding, with a lot of excellent resources, tutorials, and the language itself being "easier" to pick up and work with than say C#, which also has an incredible Discord library.  
JS was also favoured over some other popular bot languages for many convenience reasons. Python is widely used but its asynchronous modes aren't as convenient to implement and the Discord library itself is subpar, Ruby it more of a niche language and Java suffers from the same complexity requirements as C#.

### Development

Yuuto bot has its own development server, you can join it by clicking [here](https://discord.gg/fPFbV8G). The server is the official means of discussion and collaboration on the bot, together with GitHub's collaboration tools.

## Development Server

The development server is the place where the campers can interact and test the bot, as for many it might be easier than to work with GitHub's intergrated tools and branches. The server also makes use of webhooks to make integration with GitHub even simpler.

### Bots

To test the code in an united environment, multiple bots will be in the server.  
_BeachBall_ is the official development bot that runs the code in the _develop_ branch. Once a user pushes code to the _develop_ branch, the bot is automatically updated. _BabyShark_ is a bot that is only active when code is ready to be released to Yuuto. _Backend_ is an administrative bot doing under the hood work that one should pay no mind to, such as deployment server and git integrations.

For _feature_ branches, each camper / developer is welcome and encouraged to add their own testing bot to the server and using it in conjunction with the feature-testing channels to develop it. This lightens the load on BeachBall, and also gives you more control of the bot such as viewing console logs or starting it up / shutting it down.

### Channels

The development server is split into different categories, which are:

- informative: channels containing official updates and webhooks,
- general: general discussion channels,
- development: channels containing development tasks and discussions, also a great place to ask for help,
- testing: different channels that are used for testing purposes.

### Testing channels

Testing channels are categorised based on the project branch they should be used in conjunction with (more detail in [Git flow](#git-flow)).

- release-testing: will only be activated to give a final test to the bot before the code is deployed
- development-testing: general testing of the code in the _develop_ branch
- feature-testing-x: branches to test bots in feature branches
- special-channel-x: channels corresponding to specific channels in the CB server

### .env

Since some commands might be role or channel specific, and these IDs differ between the CB server and the development server, _environment variables_ should be used in code when locking features to specific IDs.  
This way, all that needs to be different for the feature + BeachBall bots and Yuuto bot is the `.env` file located on disk, while the code can stay the same and be directly implemented without any modifications from _release_ branch.

## Development process

To keep the project smooth and running, it is important to have a rigorous development process and a standardised way of doing things.

### Git flow

The following sections contain information about branches, and how they should be treated. If you aren't familiar with how to work with git, please familiarise yourself with its basics, and remember to ask for help from other devs should you need to. Proper git workflow and usage is crucial for the smooth operation of the project.

#### Master branch - Yuuto

The _master_ branch is the most important branch and the one that contains the running code of Yuuto. This branch is protected and nobody, not even the maintainers can push code to it directly. The only way code can make its way to the _master_ branch, is when _release_ gets merged with it by a maintainer.

#### Release branch - BabyShark

The _release_ branch is a branch based off _develop_ branch, and any additions to it should only contain bug fixes, quality improvements and final polishes. This branch is created once enough or noticeable features on _develop_ get finalised, and it is time to deploy them to Yuuto. The code in the _release_ branch is ran by BabyShark. Once a maintainer merges _release_ with _master_, the branch gets deleted.

Work can continue on the _develop_ branch and other branches while _release_ is being worked on, and the auditing of _release_ might take time due to external factors. After the branch is deleted, work will resume as previously, and BabyShark will be toggled off.

#### Develop branch - BeachBall

The _develop_ branch is the main development branch of Yuuto and the one that BeachBall is running. When code is pushed to this branch BeachBall will automatically update itself to run it. While there are no restritions to pushes to _develop_, this automatic updating should be kept in mind, as only the maintainers have access to the bot should a fatal error occur.

Note: _BeachBall is configured to restart itself if possible, thus permanent crashes are unlikely, however depending on the severity of the issue or configuration mistake, permanent crashes may still occur._

New features shouldn't be committed to this branch directly, and merges with _feature_ should be used instead. Direct commits should only update code quality updates, and features should be merged to _develop_ only when they are already fairly stable.

#### Feature branches - self-hosted

The _feature_ branches should be the main working branches for developers, and code on the _feature_ branch a dev is currently working on should be hosted by themself to allow for maximum flexibility. A new branch should be created for each new feature added and in the following format: `feature-[featurename]`. If the feature you want to work on already has a branch, devs should work on it together instead of creating spin-offs. If a spin-off must be crated, the following name format should be used: `feature-[featurename]-var[x]`, where `x` is the incremental variation number (starting with 1).

Once you or the devs working on the branch deem the feature to be complete enough for deployment to BeachBall, the _feature_ branch should be merged with the _develop_ branch.
