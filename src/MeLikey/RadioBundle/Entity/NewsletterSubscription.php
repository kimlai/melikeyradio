<?php

namespace MeLikey\RadioBundle\Entity;

/**
 * MeLikey\RadioBundle\Entity\NewsletterSubscription
 *
 */
class NewsletterSubscription
{
    /**
     * @var string $email
     */
    private $email;

    /**
     * Set email
     *
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }
}
