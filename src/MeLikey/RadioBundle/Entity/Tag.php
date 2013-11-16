<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MeLikey\RadioBundle\Entity\Tag
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Tag
{
    /**
     * @var integer $id
     * 
     * @ORM\Column(name="id", type="string", length=255, nullable=FALSE)
	 * @ORM\Id
     */
    protected $id;

    /**
     * @var string $name
     * 
     * @ORM\Column(name="name", type="string", length=255, nullable=FALSE)
     */
    protected $name;

	public function getId()
	{
		return $this->id;
	}

	public function setId($id)
	{
		$this->id = $id;
	}

	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name = $name;
	}

	public function __toString()
	{
		return $this->id;
	}
}