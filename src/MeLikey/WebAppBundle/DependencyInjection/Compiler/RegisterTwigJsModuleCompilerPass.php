<?php

namespace MeLikey\WebAppBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;

class RegisterTwigJsModuleCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('twig_js.compiler')) {
            return;
        }

        $definition = $container->getDefinition('twig_js.compiler');

        $definition->addMethodCall(
            'addTypeCompiler',
            array(new Reference('twig_js.amd_module_compiler'))
        );
    }
}
