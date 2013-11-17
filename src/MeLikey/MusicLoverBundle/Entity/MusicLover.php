<?php

namespace MeLikey\MusicLoverBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * MeLikey\MusicLoverBundle\Entity\MusicLover
 *
 * @ORM\Entity
 * @ORM\Table()
 */
class MusicLover extends BaseUser
{
    /**
    * @ORM\Id
    * @ORM\Column(type="integer")
    * @ORM\GeneratedValue(strategy="AUTO")
    */
    protected $id;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }
}
