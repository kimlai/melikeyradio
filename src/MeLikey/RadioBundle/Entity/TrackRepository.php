<?php

namespace MeLikey\RadioBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * TrackRepository
 */
class TrackRepository extends EntityRepository
{
    public function index($offset, $tags = NULL)
    {
        $qb = $this->createQueryBuilder('t');

        $qb->join('t.tags', 'tags')
            ->addSelect('tags')
            ->orderBy('t.created', 'DESC')
            ->setFirstResult($offset)
            ->setMaxResults(10);

        if ($tags) {
            $qb->join('t.tags', 'tag', 'WITH', $qb->expr()->in('tag.id', ':tags'))
                ->setParameter('tags', $tags);
        }

        return new Paginator($qb->getQuery(), $fetchJoinCollection = true);
    }
}
