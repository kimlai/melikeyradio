<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * TrackRepository
 */
class TrackRepository extends EntityRepository
{
    public function findByTags($tags)
    {
        $qb = $this->createQueryBuilder('t');

        $qb->join('t.tags', 'tags')
            ->addSelect('tags')
            ->orderBy('t.created', 'DESC');

        if ($tags) {
            $qb
                ->join('t.tags', 'tag', 'WITH', $qb->expr()->in('tag.name', ':tags'))
                ->setParameter('tags', $tags);
        }

        return $qb->getQuery()->getResult();

    }
}
