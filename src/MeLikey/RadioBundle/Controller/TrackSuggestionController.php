<?php

namespace MeLikey\RadioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use MeLikey\RadioBundle\Entity\TrackSuggestion;
use MeLikey\RadioBundle\Form\Type\TrackSuggestionType;

class TrackSuggestionController extends Controller
{
    public function newAction()
    {
        $trackSuggestion = new TrackSuggestion();
        $form = $this->createForm(new TrackSuggestionType(), $trackSuggestion);

        $request = $this->getRequest();
        if ($request->getMethod() == 'POST') {
            $form->bindRequest($request);
            if ($form->isValid()) {
                //send an email to submission@melikeyradio.com
                $message = \Swift_Message::newInstance()
                    ->setSubject('Me Likey Track Suggestion')
                    ->setFrom('contact@melikeyradio.com')
                    ->setTo('kimlai.t@gmail.com')
                    ->setBody($this->renderView('MeLikeyRadioBundle:TrackSuggestion:email.txt.twig', array('suggestion' => $trackSuggestion)));
                $this->get('mailer')->send($message);

                return $this->redirect($this->generateUrl('me_likey_radio_track_suggestion_thanks'));
            }
        }
        $template = "MeLikeyRadioBundle:TrackSuggestion:new.html.twig";

        return $this->render($template, array(
            'form'	=> $form->createView(),
        ));
    }

    public function thanksAction()
    {
        $template = "MeLikeyRadioBundle:TrackSuggestion:thanks.html.twig";

        return $this->render($template);
    }
}
