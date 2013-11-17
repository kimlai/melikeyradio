<?php

namespace MeLikey\ApiBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\View;

class TagController extends FOSRestController
{
    /**
     * Lists all tags.
     *
     * @Route
     * @View
     */
    public function getTagsAction()
    {
        $tags = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Tag')
            ->findAll();

        return $tags;
    }

    /**
     * Returns a single tag details.
     *
     * @Route
     * @View
     */
    public function getTagAction($id)
    {
        $tag = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Tag')
            ->find($id);

        if (!$tag) {
            throw new NotFoundHttpException("Unable to find the tag.");
        }

        return $this->view($tag);
    }
}
