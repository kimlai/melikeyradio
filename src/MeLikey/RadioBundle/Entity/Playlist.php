<?php

namespace MeLikey\RadioBundle\Entity;

use Docrine\Common\Collections\ArrayCollection;

/**
 * Playlist
 */
class Playlist
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $name
     */
    private $name;

    /**
     * @var ArrayCollection $playlistItems
     */
    private $playlistItems;
	
    public function __construct()
    {
        $this->playlistItems = new ArrayCollection();
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
     * @param PlaylistItem $playlistItems
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
     * @param PlaylistItem $playlistItems
     */
    public function addPlaylistItem(PlaylistItem $playlistItem)
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
