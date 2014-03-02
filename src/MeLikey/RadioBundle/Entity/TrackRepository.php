<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * TrackRepository
 */
class TrackRepository extends EntityRepository
{
    public function findByTags($tags, $offset = 0, $limit = 30)
    {
        $qb = $this->createQueryBuilder('t');

        $qb->leftJoin('t.tags', 'tags')
            ->addSelect('tags')
            ->orderBy('t.created', 'DESC')
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        if ($tags) {
            $qb
                ->join('t.tags', 'tag', 'WITH', $qb->expr()->in('tag.name', ':tags'))
                ->setParameter('tags', $tags);
        }

        return new Paginator($qb->getQuery(), $fetchJoinCollection = true);
    }
}
