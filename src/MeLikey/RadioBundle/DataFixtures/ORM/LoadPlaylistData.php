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

        for ($i=0; $i<30; $i++) {
            $playlistItem = new PlaylistItem();
            $track = $this->getReference('track');
            $playlistItem->setTrack($this->getReference('track'));
            $playlistItem->setPosition($i);

            $playlist->addPlaylistItem($playlistItem);

            $manager->persist($playlistItem);
        }

        $manager->persist($playlist);
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
