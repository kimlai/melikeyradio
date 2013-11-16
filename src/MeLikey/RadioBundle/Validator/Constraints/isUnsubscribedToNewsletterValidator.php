<?php

namespace MeLikey\RadioBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class isUnsubscribedToNewsletterValidator extends ConstraintValidator
{
	private $mailjet;

	public function __construct(\Snowcap\MailjetBundle\Client $mailjet)
	{
		$this->mailjet = $mailjet;
	}

	public function validate($value, Constraint $constraint)
	{
		$params = array(
			'id' => '227900',
		);
		$response = $this->mailjet->listsContacts($params);
		$response = unserialize($response);
		$contacts = $response['result'];
		foreach($contacts as $contact) {
			if($contact['email'] == $value) {
				$this->context->addViolation($constraint->message, array('%string%' => $value));
				break;
			}
		}
	}
}
