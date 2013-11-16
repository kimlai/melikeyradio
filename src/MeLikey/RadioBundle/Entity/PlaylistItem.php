<?php

namespace MeLikey\RadioBundle\Entity;

/**
 * PlaylistItem
 */
class PlaylistItem
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var integer $position
     */
    private $position;

    /**
     * @var Playlist $playlist
     */
    private $playlist;

    /**
     * @var Track $track
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
     * @param Playlist $playlist
     */
    public function setPlaylist(Playlist $playlist)
    {
        $this->playlist = $playlist;
    }

    /**
     * Get playlist
     *
     * @return Playlist 
     */
    public function getPlaylist()
    {
        return $this->playlist;
    }

    /**
     * Set track
     *
     * @param Track $track
     */
    public function setTrack(Track $track)
    {
        $this->track = $track;
    }

    /**
     * Get track
     *
     * @return Track 
     */
    public function getTrack()
    {
        return $this->track;
    }
}
