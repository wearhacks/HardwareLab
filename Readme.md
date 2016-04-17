[![Stories in Ready](https://badge.waffle.io/wearhacks/HardwareLab.png?label=ready&title=Ready)](https://waffle.io/wearhacks/HardwareLab)
##Installation

[![Join the chat at https://gitter.im/wearhacks/HardwareLab](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wearhacks/HardwareLab?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


###Database installation
Install Mongodb, and run mongo on the [local computer](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

```sudo mongod```

###Dependencies installation
Make sure to have [node and npm](https://nodejs.org/download/) installed to the latest version

Install yo, grunt and bower for dev purposes

```npm install -g yo grunt-cli bower```

####Dependencies Installation

Client-side dependencies
```
bower install
```
Server-side dependencies
```
npm install
```


###Launch
Run the server

```
grunt serve
```

###Development 

Launch once then comment out the user accounts in seeds.js (Harwarelab/evironment/seed.js)
