<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * PlaylistRepository
 *
 */
class PlaylistRepository extends EntityRepository
{
    public function find($id)
    {
        $qb = $this->createQueryBuilder('p');

        $qb->where('p.id = :id')
            ->join('p.playlistItems', 'pi')
            ->addSelect('pi')
            ->join('pi.track', 't')
            ->addSelect('t')
            ->orderBy('pi.position', 'DESC')
            ->setParameters(array(
                'id' => $id,
            ));

        return $qb->getQuery()->getOneOrNullResult();
    }

}
