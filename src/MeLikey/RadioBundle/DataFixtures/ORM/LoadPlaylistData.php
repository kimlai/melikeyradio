<?php

namespace MeLikey\RadioBundle\DataFixtures\ORM;

use Symfony\Component\Yaml\Parser;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MeLikey\RadioBundle\Entity\Playlist;
use MeLikey\RadioBundle\Entity\PlaylistItem;

class LoadPlaylistData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface $container
     */
    private $container;

    /**
     * @{inheritdoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @{inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $yaml = new Parser();

        $playlists = $yaml->parse(
            file_get_contents(
                $this->container->get('kernel')->locateResource('@MeLikeyRadioBundle/Resources/fixtures/playlists.yml')
            )
        );

        foreach ($playlists as $playlistData) {
            $playlist = new Playlist();
            $playlist->setName($playlistData['name']);

            foreach ($playlistData['tracks'] as $index => $track) {
                $playlistItem = new PlaylistItem();
                $playlistItem->setTrack($this->getReference($track));
                $playlistItem->setPosition($index);

                $playlist->addPlaylistItem($playlistItem);
                $manager->persist($playlistItem);
            }

            $manager->persist($playlist);
        }
        $manager->flush();
    }

    /**
     * @{inheritdoc}
     */
    public function getOrder()
    {
        return 3;
    }
}
