<?php

namespace MeLikey\RadioBundle\TwigJs;

use MeLikey\RadioBundle\TwigJs\Compiler\AmdModuleCompiler;
use TwigJs\JsCompiler;

class CompileRequestHandler extends \TwigJs\CompileRequestHandler
{
    public function __construct(\Twig_Environment $env, \TwigJs\JsCompiler $compiler)
    {
        parent::__construct($env, $compiler);
        $this->compiler->addTypeCompiler(new AmdModuleCompiler());
    }
}
