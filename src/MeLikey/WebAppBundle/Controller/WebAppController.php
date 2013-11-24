<?php

namespace MeLikey\WebAppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class WebAppController extends Controller
{
    public function indexAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:index.html.twig', array('playlistID' => 21));
    }

    public function blogAction($page)
    {
        $tracks = $this
            ->getDoctrine()
            ->getRepository('MeLikeyRadioBundle:Track')
            ->findAll();

        return $this->render('MeLikeyWebAppBundle:WebApp:blog.html.twig', array('tracks' => $tracks));
    }

    public function contactAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:contact.html.twig');
    }

    public function aboutAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:about.html.twig');
    }

    public function suggestionAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:suggestion.html.twig');
    }

    public function likeysAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:likeys.html.twig');
    }


    /**
    * Ugly Hack to use assetic to generate js templates using twig_js
    */
    public function generateTemplatesAction()
    {
        return $this->render('MeLikeyWebAppBundle:WebApp:js-templates.html.twig');
    }
}
