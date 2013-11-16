<?php

namespace MeLikey\RadioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use MeLikey\RadioBundle\Entity\NewsletterSubscription;
use MeLikey\RadioBundle\Form\Type\NewsletterSubscriptionType;

class NewsletterController extends Controller
{
	public function subscribeAction()
	{
		$subscription = new NewsletterSubscription();
		$subscription->setEmail("Enter your email here");
		$form = $this->createForm(new NewsletterSubscriptionType(), $subscription);

		$request = $this->getRequest();
		if($request->getMethod() == 'POST') {
			$form->bindRequest($request);
			if($form->isValid()) {
				$email = $subscription->getEmail();
				//Use the Mailjet API to add the provided email to our Contact List.
				$mailjet = $this->get('snowcap_mailjet.client');
				$response = $mailjet->listsAddContact(array(
					'method' 	=> 'POST',
					'contact'	=> $email,
					'id'		=> '227900',
				));
				$response = unserialize($response);
				//Send a confirmation email.
				if($response['status'] == 'OK') {
					$message = \Swift_Message::newInstance()
						->setSubject('MeLikeyRadio Newsletter subscription')
						->setFrom('contact@melikeyradio.com')
						->setTo($email)
						->setBody($this->renderView('MeLikeyRadioBundle:Newsletter:subscription-success-email.txt.twig'));
					$this->get('mailer')->send($message);
					return $this->redirect($this->generateUrl('me_likey_radio_newsletter_thanks'));
				}
				else {
					var_dump($response);
					throw new \Exception($response['error']);
				}
			}
		}
		return $this->render("MeLikeyRadioBundle:Newsletter:subscription.html.twig", array('form' => $form->createView()));	
	}

	public function thanksAction()
	{
		$template = "MeLikeyRadioBundle:Newsletter:thanks.html.twig";
		return $this->render($template);	
	}
}
