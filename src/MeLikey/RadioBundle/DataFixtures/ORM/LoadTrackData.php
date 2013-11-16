<?php

namespace MeLikey\RadioBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use MeLikey\RadioBundle\Entity\Track;

class LoadTrackData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @{inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $track = new Track();
        $track->setArtist("Melodiesinfonie");
        $track->setTitle("Mentalpeace");
        $track->setSoundcloud("https://soundcloud.com/melodiesinfonie/mentalpeace-for-beat-enoteca");
        $track->setAlbumart("toto");
        $tags = new ArrayCollection();
        $tags[] = $this->getReference('tag');
        $track->setTags($tags);

        $manager->persist($track);
        $manager->flush();

        $this->addReference('track', $track);
    }

    /**
     * @{inheritdoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
