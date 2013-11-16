<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * PlaylistRepository
 *
 */
class PlaylistRepository extends EntityRepository
{
	// TODO add the "fragment" part of this thing. Currently returns the whole playlist.
	public function findPlaylistFragment($id, $position)	
	{
		$qb = $this->createQueryBuilder('p');
		
		$qb->where('p.id = :id')
			->join('p.playlistItems', 'pi')
			->addSelect('pi')
			->join('pi.track', 't')
			->addSelect('t')
			->orderBy('pi.position', 'ASC')
			->setParameters(array(
				'id' => $id,
			));

		return $qb->getQuery()->getOneOrNullResult();
	}

}
