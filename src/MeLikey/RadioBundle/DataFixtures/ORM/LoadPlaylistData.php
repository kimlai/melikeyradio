<?php

namespace MeLikey\RadioBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MeLikey\RadioBundle\Entity\Playlist;
use MeLikey\RadioBundle\Entity\PlaylistItem;

class LoadPlaylistData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @{inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $playlist = new Playlist();
        $playlist->setName("Playlist 1");

        $playlistItem = new PlaylistItem();
        $track = $this->getReference('track');
        $playlistItem->setTrack($this->getReference('track'));
        $playlistItem->setPosition(0);

        $playlist->addPlaylistItem($playlistItem);

        $manager->persist($playlist);
        $manager->persist($playlistItem);
        $manager->flush();
    }

    /**
     * @{inheritdoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
