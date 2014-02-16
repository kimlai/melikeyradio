<?php

namespace MeLikey\ApiBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\View;
use Doctrine\Common\Collections\ArrayCollection;

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
        $offset = $this->getRequest()->query->get('offset') ?: 0;
        $limit = $this->getRequest()->query->get('limit') ?: 30;
        $tags = $this->getRequest()->query->get('tags');
        $tags = $tags ? explode(",", $tags, 20) : NULL;
        $paginator = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Track')
            ->findByTags($tags, $offset, $limit);

        //TODO hack because the JMSSerialzer doesn't like Doctrine's Paginator
        //see https://github.com/schmittjoh/JMSSerializerBundle/issues/286
        $tracks = new ArrayCollection();
        foreach ($paginator as $track) {
            $tracks[] = $track;
        }

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
