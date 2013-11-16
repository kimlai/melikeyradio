<?php

namespace MeLikey\MusicLoverBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
	/*
	 * Displays a tabbed form. tab1 = login, tab2 = registration.
	 */
	public function connectAction()
	{
        return $this->render('MeLikeyMusicLoverBundle:Default:connect.html.twig');
	}

    public function loginSuccessAction()
    {
        return $this->render('MeLikeyMusicLoverBundle:Default:login_callback.html.twig');
    }
}
