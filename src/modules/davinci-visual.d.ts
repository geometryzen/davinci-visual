//
// davinci-visual.d.ts
//
// This file was created manually in order to support the davinci-visual library.
//
declare module visual
{
    class VisualElement<T extends THREE.Geometry>
    {
      constructor(geometry: T, color: number, opacity: number = 1.0, transparent: boolean = false) {}
    }
}
declare module visual {
    var VERSION: string;
}
