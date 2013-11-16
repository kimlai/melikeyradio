<?php

namespace MeLikey\RadioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;

use MeLikey\RadioBundle\Entity\Track;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('MeLikeyRadioBundle:Default:index.html.twig', array(
			'playlistID' => 1
		));
    }

	public function singleTrackAction($id)
	{
		$request = $this->getRequest();
		if(!$request->isXmlHttpRequest()) {
			return $this->render('MeLikeyRadioBundle:Default:index.html.twig', array(
				'playlistID' => 1
			));
		}
		$track = $this->getDoctrine()->getRepository('MeLikeyRadioBundle:Track')->find($id);
		if(!is_object($track)) {
			throw $this->createNotFoundException('The Track could not be found.');	
		}
		//TODO Hack to determine the artwork url. Problem is, with Twig-js we can't determine asset urls...
		$artwork = $track->getAlbumartWebPath();
		if($artwork) {
			$track->setArtworkUrl($this->get('templating.helper.assets')->getUrl($track->getAlbumartWebPath()));
		}
		else {
			$track->setArtworkUrl($this->get('templating.helper.assets')->getUrl('bundles/melikeyradio/images/default_artwork'));
		}
		$serializer = $this->get('jms_serializer');
		$json = $serializer->serialize($track, 'json');

		$response = new Response($json);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

	public function tracksAction()
	{
		$tags = $this->getRequest()->get('tags');
		$tags = $tags ? explode(",", $tags, 20) : NULL;
		$offset = $this->getRequest()->get('offset');
		$offset = $offset ? $offset : 0;
		$paginator = $this->getDoctrine()
			->getRepository('MeLikeyRadioBundle:Track')
			->index($offset, $tags);
		
		$tracks = array();
		foreach($paginator as $track) {
			//TODO Hack to determine the artwork url. Problem is, with Twig-js we can't determine asset urls...
			$artwork = $track->getAlbumartWebPath();
			if($artwork) {
				$track->setArtworkUrl($this->get('templating.helper.assets')->getUrl($track->getAlbumartWebPath()));
			}
			else {
				$track->setArtworkUrl($this->get('templating.helper.assets')->getUrl('bundles/melikeyradio/images/default_artwork'));
			}
			$tracks[] = $track;
		}

		$serializer = $this->get('jms_serializer');
		$json = $serializer->serialize($tracks, 'json');

		$response = new Response($json);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}
	
	/**
	 * Returns a fragment of the current playlist ([position-5, ..., position, position+5]).
	 * The query uses the MOD operator in case we reach an end of the playlist.
	 */
	public function playlistFragmentAction($playlistID, $position)
	{
		$playlistID = $this->getRequest()->get('playlistID');
		$position = $this->getRequest()->get('position');
		//TODO : move the "fragment" part to the Repository Query. ie the Repo should return a fragment of the playlist, not the whole thing.
		$playlist = $this->getDoctrine()
			->getRepository('MeLikeyRadioBundle:Playlist')
			->findPlaylistFragment($playlistID, $position);

		if(!is_object($playlist)) {
			throw $this->createNotFoundException('The playlist could not be found.');	
		}
		$pis = $playlist->getPlaylistItems();
		$pLength = count($pis);
		$position = $position % $pLength;
		$playlistFragment = array();
		for($i = $position - 6; $i <= $position + 6; $i++) {
			$mod = $i % $pLength;
			$index = ($mod < 0) ? $mod + $pLength : $mod; // php mod can return negative values.
			$track = $pis->get($index)->getTrack();
			//TODO Hack to determine the artwork url. Problem is, with Twig-js we can't determine asset urls...
			$artwork = $track->getAlbumartWebPath();
			if($artwork) {
				$track->setArtworkUrl($this->get('templating.helper.assets')->getUrl($track->getAlbumartWebPath()));
			}
			else {
				$track->setArtworkUrl($this->get('templating.helper.assets')->getUrl('bundles/melikeyradio/images/default_artwork'));
			}
			$playlistFragment[] = array('track' => $track, 'position' => $mod);
		}
		// end TODO

		$serializer = $this->get('jms_serializer');
		$json = $serializer->serialize($playlistFragment, 'json');

		$response = new Response($json);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

	public function tagsAction()
	{
		$tags = $this->getDoctrine()
			->getRepository('MeLikeyRadioBundle:Tag')
			->findAll();

		$serializer = $this->get('jms_serializer');
		$json = $serializer->serialize($tags, 'json');

		$response = new Response($json);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}
	
	
	/**
	 * Ugly Hack to use assetic to generate js templates using twig_js
	 */
    public function generateTemplatesAction()
    {
        return $this->render('MeLikeyRadioBundle:Default:js-templates.html.twig');
	}
}
