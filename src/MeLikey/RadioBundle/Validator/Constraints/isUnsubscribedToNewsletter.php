<?php

namespace MeLikey\RadioBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/*
 * @Annotation
 */
class isUnsubscribedToNewsletter extends Constraint
{
	public $message = 'Looks like this email is already subscribed to our newsletter.';

	public function validatedBy()
	{
		return 'is_unsubscribed_to_newsletter_validator';
	}
}
