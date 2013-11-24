<?php

namespace MeLikey\WebAppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use MeLikey\RadioBundle\Entity\Track;

class TrackController extends Controller
{
    public function showAction(Track $track)
    {
        return $this->render('MeLikeyWebAppBundle:Track:show.html.twig', array('track' => $track));
    }

    /**
    * Ugly Hack to use assetic to generate js templates using twig_js
    */
    public function generateTemplatesAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:js-templates.html.twig');
    }
}
