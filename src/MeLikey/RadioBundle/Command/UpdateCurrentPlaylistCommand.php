<?php

namespace MeLikey\RadioBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Dumper;
use Symfony\Component\Yaml\Parser;

class UpdateCurrentPlaylistCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('melikeyradio:currentPlaylist:update')
            ->setDescription('Sets the current playlist to the next one')
            ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $parametersPath = $this->getContainer()->get('kernel')->getRootDir() . '/config/parameters.yml';

        $yaml = new Parser();
        $parameters = $yaml->parse(file_get_contents($parametersPath))['parameters'];
        $playlistId = $parameters['playlist_id'] ?: 0;

        $playlists = $this
            ->getContainer()
            ->get('doctrine')
            ->getRepository('MeLikeyRadioBundle:Playlist')
            ->findAll();

        foreach($playlists as $k => $p) {
            if ($p->getId() === $playlistId) {
                $index = ($k + 1) % count($playlists);
                $newPlaylist = $playlists[$index];
                break;
            }
        }

        $parameters['playlist_id'] = $newPlaylist->getId();

        $dumper = new Dumper();
        $yaml = $dumper->dump(['parameters' => $parameters], 2);

        file_put_contents($parametersPath, $yaml);

        $output->writeln("new playlist : " . $newPlaylist->getName());

        $command = $this->getApplication()->find('cache:clear');
        $command->run($input, $output);
    }
}
