<?php

namespace MeLikey\RadioBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TrackSuggestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
		$builder->add('link', 'text', array( 
				'data' => "Paste your link here"
			))
			->add('email', 'email', array(
				'label'		=> 'Your email',
				'required' 	=> false))
			->add('extra', 'textarea', array(
				'label'		=> 'Why this track ?',
				'required' 	=> false));
    }

    public function getName()
    {
        return 'melikey_radiobundle_tracksuggestiontype';
    }

	public function setDefaultOptions(OptionsResolverInterface $resolver)
	{
		$resolver->setDefaults(array(
			'data_class' => 'MeLikey\RadioBundle\Entity\TrackSuggestion',
		));
	}
}
