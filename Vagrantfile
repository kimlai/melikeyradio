# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Base box
  config.vm.box = "melikeyradio"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.synced_folder ".", "/vagrant", nfs: true
  config.vm.network "private_network", ip: "10.9.8.7"

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
  end

  # Shell provisioning
  config.vm.provision :shell, :path => "scripts/provision.sh"
end
