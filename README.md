Me Likey Radio
========================

Me Likey Radio is a simple Blog/Webradio.

Seting up your environment
----------------------------------

MeLikeyRadio uses vagrant. To get your virtual machine up and running, simply run :

    vagrant up

Then, log into the new vm and go to the dev dir:

    vagrant ssh
    cd /vagrant


Once you're logged in, you'll need to install your vendors :

    wget http://getcomposer.org/composer.phar
    php composer.phar install

That's it, you've set up your dev environment !
To see the website in action, you can use the webserver built in PHP :

    ./app/console server:run 0.0.0.0:8080 -vvv

You can now access the website at http://10.9.8.7:8080
