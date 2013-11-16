<?php

namespace MeLikey\RadioBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MeLikey\RadioBundle\Entity\Tag;

class LoadTagData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @{inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $tag = new Tag();
        $tag->setName("tag");

        $manager->persist($tag);
        $manager->flush();

        $this->addReference('tag', $tag);
    }

    /**
     * @{inheritdoc}
     */
    public function getOrder()
    {
        return 1;
    }
}
