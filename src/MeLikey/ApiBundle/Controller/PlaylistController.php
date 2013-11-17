<?php

namespace MeLikey\ApiBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\View;

class PlaylistController extends FOSRestController
{
    /**
     * Lists all playlists.
     *
     * @Route
     * @View
     */
    public function getPlaylistsAction()
    {
        $playlists = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Playlist')
            ->findAll();

        return $playlists;
    }

    /**
     * Returns a single Playlist details.
     *
     * @Route
     * @View
     */
    public function getPlaylistAction($id)
    {
        $playlist = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Playlist')
            ->find($id);

        if (!$playlist) {
            throw new NotFoundHttpException("Unable to find the playlist.");
        }

        return $playlist;
    }
}
