import VisualElement = require('davinci-visual/VisualElement');
import ArrowGeometry = require('davinci-visual/ArrowGeometry');

class Arrow extends VisualElement<ArrowGeometry>
{
  constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false)
  {
    super(new ArrowGeometry(scale), color, opacity, transparent);
  }
}

export = Arrow;
