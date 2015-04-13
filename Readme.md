[![Stories in Ready](https://badge.waffle.io/wearhacks/HardwareLab.png?label=ready&title=Ready)](https://waffle.io/wearhacks/HardwareLab)
##Installation


###Database installation
Install Mongodb, and run mongo on the [local computer](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

```sudo mongod```

###Dependencies installation
Get the dependencies: in the root directory run

####Install Bower
```
sudo bower install
```

####Installing [Grunt](http://gruntjs.com/getting-started)
```
npm install grunt --save-dev
npm install --save-dev
```

###Launch
Run the server

```
grunt serve
```

###Development 

Launch once then comment out the user accounts in seeds.js (Harwarelab/evironment/seed.js)
