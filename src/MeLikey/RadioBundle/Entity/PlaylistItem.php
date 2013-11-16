<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MeLikey\RadioBundle\Entity\PlaylistItem
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="MeLikey\RadioBundle\Entity\PlaylistItemRepository")
 */
class PlaylistItem
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
     * @var integer $position
     *
     * @ORM\Column(name="position", type="integer")
     */
    private $position;

	/**
	 * @ORM\ManyToOne(targetEntity="\MeLikey\RadioBundle\Entity\Playlist", inversedBy="playlisItems")
	 * @ORM\JoinColumn(nullable=false)
	 */
	private $playlist;

	/**
	 * @ORM\ManyToOne(targetEntity="\MeLikey\RadioBundle\Entity\Track")
	 * @ORM\JoinColumn(nullable=false)
	 */
	private $track;

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
     * @var date $created
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    public function __construct() 
    {
	$this->created = new \DateTime();
    }

    /**
     * Get created
     *
     * @return date 
     */
    public function getCreated()
    {
        return $this->created;
    }


    /**
     * Set position
     *
     * @param integer $position
     */
    public function setPosition($position)
    {
        $this->position = $position;
    }

    /**
     * Get position
     *
     * @return integer 
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set playlist
     *
     * @param MeLikey\RadioBundle\Entity\Playlist $playlist
     */
    public function setPlaylist(\MeLikey\RadioBundle\Entity\Playlist $playlist)
    {
        $this->playlist = $playlist;
    }

    /**
     * Get playlist
     *
     * @return MeLikey\RadioBundle\Entity\Playlist 
     */
    public function getPlaylist()
    {
        return $this->playlist;
    }

    /**
     * Set track
     *
     * @param MeLikey\RadioBundle\Entity\Track $track
     */
    public function setTrack(\MeLikey\RadioBundle\Entity\Track $track)
    {
        $this->track = $track;
    }

    /**
     * Get track
     *
     * @return MeLikey\RadioBundle\Entity\Track 
     */
    public function getTrack()
    {
        return $this->track;
    }

    /**
     * Set created
     *
     * @param datetime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }
}