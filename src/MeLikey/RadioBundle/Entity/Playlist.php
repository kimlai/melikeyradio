<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

/**
 * MeLikey\RadioBundle\Entity\Playlist
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="MeLikey\RadioBundle\Entity\PlaylistRepository")
 */
class Playlist
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string $name
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="\MeLikey\RadioBundle\Entity\PlaylistItem", mappedBy="playlist", cascade={"persist"})
     * @ORM\OrderBy({"position" = "DESC"})
     */
    private $playlistItems;

    public function __construct()
    {
        $this->playlistItems = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set playlistItems
     *
     * @param MeLikey\RadioBundle\Entity\PlaylistItem $playlistItems
     */
     public function setPlaylistItems(Collection $playlistItems)
     {
         foreach ($playlistItems as $pi) {
            $pi->setPlaylist($this);
        }
        $this->playlistItems = $playlistItems;
     }

    /**
     * Add playlistItems
     *
     * @param MeLikey\RadioBundle\Entity\PlaylistItem $playlistItems
     */
    public function addPlaylistItem(\MeLikey\RadioBundle\Entity\PlaylistItem $playlistItem)
    {
        $playlistItem->setPlaylist($this);
        $this->playlistItems[] = $playlistItem;
    }

    /**
     * Get playlistItems
     *
     * @return Doctrine\Common\Collections\Collection
     */
    public function getPlaylistItems()
    {
        return $this->playlistItems;
    }
}
