<?php

namespace MeLikey\ApiBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\View;

class TrackController extends FOSRestController
{
    /**
     * Lists all tracks.
     *
     * @Route
     * @View
     */
    public function getTracksAction()
    {
        $tags = $this->getRequest()->query->get('tags');
        $tags = $tags ? explode(",", $tags, 20) : NULL;
        $tracks = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Track')
            ->findByTags($tags);

        return $tracks;
    }

    /**
     * Returns a single Track details.
     *
     * @Route
     * @View
     */
    public function getTrackAction($id)
    {
        $track = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Track')
            ->find($id);

        if (!$track) {
            throw new NotFoundHttpException("Unable to find the track.");
        }

        return $this->view($track);
    }
}
