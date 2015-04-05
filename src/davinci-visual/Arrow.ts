module visual {
    export class Arrow extends VisualElement<ArrowGeometry>
    {
      constructor(scale: number, color: number, opacity: number = 1.0, transparent: boolean = false)
      {
        super(new ArrowGeometry(scale), color, opacity, transparent);
      }
    }
}
