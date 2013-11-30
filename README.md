Me Likey Radio
========================

Me Likey Radio is a simple Blog/Webradio. It uses multiple APIs (soundcloud, youtube, vimeo) and a custom javascript player to simulate a music webradio.

It uses Symfony2 on the server and Chaplinjs in the client.

Seting up your environment
----------------------------------

MeLikeyRadio uses vagrant. To get your virtual machine up and running, simply run :

    vagrant up

Then, log into the new vm and go to the dev dir:

    vagrant ssh
    cd /vagrant


### Server-side setup

Once you're logged in, you'll need to install your vendors :
```
wget http://getcomposer.org/composer.phar
php composer.phar install
``` 
Install the web assets :
```
$ ./app/console assets:install --symlink
```
Load the doctrine fixtures :
```
$ ./app/console doctrine:fixtures:load
```
    
### Webclient setup

The webclient is a rich javascript app powered by [Chaplinjs](http://chaplinjs.org). It uses coffeescript and compass.

Normally the VM should have nodejs, npm, grunt, bower and compass already installed. If not, try running the following command on your host machine :
```
$ vagrant provision
```

The client source code is located in `src/MeLikey/WebAppBundle/Resources/client`. To install the frontend dev dependencies, move inside that folder and run
```
$ npm install && bower install
```

To compile the coffeescript files into javascript :
```
$ grunt coffee
```
To compile the sass files into css :
```
$ grunt compass
```
And finally, to compile the twig views into javascript, go to the root folder of the app and run 
```
$ ./app/console assetic:dump
```

That's it, you've set up your dev environment !
To see the website in action, you can use the webserver built in PHP :

    ./app/console server:run 0.0.0.0:8080 -vvv

You can now access the website at http://10.9.8.7:8080
