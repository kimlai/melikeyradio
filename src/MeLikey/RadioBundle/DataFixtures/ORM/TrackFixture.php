<?php

namespace MeLikey\RadioBundle\DataFixtures\ORM;

use Symfony\Component\Yaml\Parser;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use MeLikey\RadioBundle\Entity\Track;

class TrackFixture extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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

        $tracks = $yaml->parse(
            file_get_contents(
                $this->container->get('kernel')->locateResource('@MeLikeyRadioBundle/Resources/fixtures/tracks.yml')
            )
        );

        foreach ($tracks as $trackData) {
            $track = $this->loadTrack($trackData);
            $manager->persist($track);
            $this->addReference($trackData['reference'], $track);
        }

        $manager->flush();
    }

    private function loadTrack($trackData)
    {
        $track = new Track();
        $track->setArtist($trackData['artist']);
        $track->setTitle($trackData['title']);
        $track->setAlbumart($trackData['albumart']);
        switch (true) {
            case isset($trackData['soundcloud']):
                $track->setSoundcloud($trackData['soundcloud']);
                break;
            case isset($trackData['youtube']):
                $track->setYoutube($trackData['youtube']);
                break;
            case isset($trackData['vimeo']):
                $track->setVimeo($trackData['vimeo']);
                break;
        }
        $tags = new ArrayCollection();
        foreach ($trackData['tags'] as $tag) {
            $tags[] = $this->getReference($tag);
        }
        $track->setTags($tags);

        return $track;
    }

    /**
     * @{inheritdoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
