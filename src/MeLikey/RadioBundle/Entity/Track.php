<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * Track
 */
class Track
{
    /**
     * @var $id
     */
    private $id;

    /**
     * @var date $created
     */
    private $created;

    /**
     * @var string $albumart
     */
    private $albumart;

    /**
     * @var string $artist
     */
    private $artist;

    /**
     * @var string $title
     */
    private $title;

    /**
     * @var string $musiclabel
     */
    private $musiclabel;

    /**
     * @var string $website
     */
    private $website;

    /**
     * @var string $youtube
     */
    private $youtube;

    /**
     * @var string $soundcloud
     */
    private $soundcloud;

    /**
     * @var string $vimeo
     */
    private $vimeo;

    /**
     * @var ArrayCollection $tags
     */
    protected $tags;

    public function __construct()
    {
        $this->created = new \DateTime();
        $this->tags = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get created
     *
     * @return DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set albumart.
     * TODO Cleans any existing thumbnails.
     *
     * @param string $albumart
     */
    public function setAlbumart($albumart)
    {
        $this->albumart = $albumart;
    }

    /**
     * Get albumart
     *
     * @return string
     */
    public function getAlbumart()
    {
        return $this->albumart;
    }

    private $artworkUrl;

    /**
     * Set artworkUrl
     *
     * @param string $artworkUrl
     */
    public function setArtworkUrl($url)
    {
        $this->artworkUrl = $url;
    }

    /**
     * Set musiclabel
     *
     * @param string $musiclabel
     */
    public function setMusiclabel($musiclabel)
    {
        $this->musiclabel = $musiclabel;
    }

    /**
     * Get musiclabel
     *
     * @return string
     */
    public function getMusiclabel()
    {
        return $this->musiclabel;
    }

    /**
     * Set website
     *
     * @param string $website
     */
    public function setWebsite($website)
    {
        $this->website = $website;
    }

    /**
     * Get website
     *
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set artist
     *
     * @param string $artist
     */
    public function setArtist($artist)
    {
        $this->artist = $artist;
    }

    /**
     * Get artist
     *
     * @return string
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * Set title
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Get id
     *
     * @param string $id
     */
    public function getId()
    {
        return $this->id;
    }

    public function getAlbumartAbsolutePath()
    {
        return null === $this->albumart ? null : $this->getAlbumartUploadRootDir().'/'.$this->albumart;
    }

    public function getAlbumartWebPath()
    {
        return null === $this->albumart ? null : $this->getAlbumartUploadDir().'/'.$this->albumart;
    }

    public function getAlbumartUploadRootDir()
    {
        // the absolute directory path where uploaded documents should be saved
         return __DIR__.'/../../../../web/'.$this->getAlbumartUploadDir();
     }

     protected function getAlbumartUploadDir()
     {
         // get rid of the __DIR__ so it doesn't screw when displaying uploaded doc/image in the view.
         return 'uploads/albumart';
     }

    /**
     * Set youtube
     *
     * @param string $youtube
     */
    public function setYoutube($youtube)
    {
        $this->youtube = $youtube;
    }

    /**
     * Get youtube
     *
     * @return string
     */
    public function getYoutube()
    {
        return $this->youtube;
    }

    /**
     * Set soundcloud
     *
     * @param string $soundcloud
     */
    public function setSoundcloud($soundcloud)
    {
        $this->soundcloud = $soundcloud;
    }

    /**
     * Get soundcloud
     *
     * @return string
     */
    public function getSoundcloud()
    {
        return $this->soundcloud;
    }

    /**
     * Set vimeo
     *
     * @param string $vimeo
     */
    public function setVimeo($vimeo)
    {
        $this->vimeo = $vimeo;
    }

    /**
     * Get vimeo
     *
     * @return string
     */
    public function getVimeo()
    {
        return $this->vimeo;
    }

    public function getInfo()
    {
        return "$this->artist - $this->title";
    }

    public function getTags()
    {
        return $this->tags;
    }

    public function setTags(ArrayCollection $tags)
    {
        $this->tags = $tags;
    }
}
