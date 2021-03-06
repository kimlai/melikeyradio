#!/usr/bin/env sh

# Installing software on virtual machine
apt-get update

apt-get install -y python-software-properties

if [ ! -f /etc/apt/sources.list.d/ondrej-php5-precise.list ]
then
    add-apt-repository -y ppa:ondrej/php5
    apt-get update
fi

if [ ! -f /etc/apt/sources.list.d/git-core-ppa-precise.list ]
then
    add-apt-repository -y ppa:git-core/ppa
    apt-get update
fi

if [ ! -f /etc/apt/sources.list.d/chris-lea-node_js-precise.list ]
then
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get update
fi

apt-get install -y php5-dev php5-cli php5-pgsql postgresql nodejs vim git rubygems

npm install -g grunt-cli bower

gem install compass
gem install animation --pre

# Configuring virtual machine

mkdir -p /etc/php5/mods-available
cat <<EOT >/etc/php5/mods-available/symfony.ini
date.timezone = Europe/Paris
xdebug.max_nesting_level = 250
short_open_tag = Off
EOT

php5enmod -s ALL symfony

#countmelikeyradio=`sudo -u postgres psql -lqt |grep -c lrqdo`
#
#[ $countlrqdo -eq 0 ] && sudo -u postgres psql <<EOT
#create user lrqdo with superuser createdb encrypted password 'lrqdo';
#create database lrqdo owner lrqdo;
#EOT

# enable git hooks
#chmod +x /vagrant/scripts/git-hooks/pre-push
#chmod +x /vagrant/scripts/git-hooks/pre-commit
#cd /vagrant/.git/hooks
#ln -sf ../../scripts/git-hooks/pre-push
#ln -sf ../../scripts/git-hooks/pre-commit

exit 0
