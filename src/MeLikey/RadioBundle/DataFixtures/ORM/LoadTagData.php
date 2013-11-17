<?php

namespace MeLikey\RadioBundle\DataFixtures\ORM;

use Symfony\Component\Yaml\Parser;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MeLikey\RadioBundle\Entity\Tag;

class LoadTagData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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

        $tags = $yaml->parse(
            file_get_contents(
                $this->container->get('kernel')->locateResource('@MeLikeyRadioBundle/Resources/fixtures/tags.yml')
            )
        );

        foreach ($tags as $tagData) {
            $tag = new Tag();
            $tag->setName($tagData['name']);

            $manager->persist($tag);
            $this->addReference($tagData['reference'], $tag);
        }
        $manager->flush();
    }

    /**
     * @{inheritdoc}
     */
    public function getOrder()
    {
        return 1;
    }
}
