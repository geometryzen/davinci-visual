module visual {
    export interface ITrackBall {
        enabled: boolean;
        rotateSpeed: number;
        zoomSpeed: number;
        panSpeed: number;
        noRotate: boolean;
        noZoom: boolean;
        noPan: boolean;
        staticMoving: boolean;
        dynamicDampingFactor: number;
        minDistance: number;
        maxDistance: number;
        keys: number[];
        update: () => void;
        handleResize: () => void;
        setSize(width: number, height: number): void;
    }
}
