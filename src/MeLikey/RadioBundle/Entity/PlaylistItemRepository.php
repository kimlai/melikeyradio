<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * PlaylistItemRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PlaylistItemRepository extends EntityRepository
{
    public function findByPlaylistandPosition($id, $position)
    {
        $qb = $this->createQueryBuilder('i');

        $qb->where('i.playlist = :id')
            ->andWhere('i.position >= :position')
            ->andWhere('i.position <= :position + 2')
            ->setParameter('id', $id)
            ->setParameter('position', $position)
            ->Leftjoin('i.track', 't')
            ->addSelect('t');

        return $qb->getQuery()->getResult();
    }
}
