<?php

namespace MeLikey\WebAppBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;

use MeLikey\WebAppBundle\DependencyInjection\Compiler\RegisterTwigJsModuleCompilerPass;

class MeLikeyWebAppBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new RegisterTwigJsModuleCompilerPass());
    }    
}
