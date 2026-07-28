declare module 'pannellum' {
  interface PannellumViewer {
    destroy(): void;
    getYaw(): number;
    getPitch(): number;
    getHfov(): number;
  }
  interface PannellumConfig {
    type?: string;
    panorama?: string;
    autoLoad?: boolean;
    autoRotate?: number;
    compass?: boolean;
    showZoomCtrl?: boolean;
    showFullscreenCtrl?: boolean;
    mouseZoom?: boolean;
    hfov?: number;
    pitch?: number;
    yaw?: number;
    minHfov?: number;
    maxHfov?: number;
    uiText?: Record<string, string>;
    [key: string]: unknown;
  }
  function viewer(container: HTMLElement | null, config: PannellumConfig): PannellumViewer;
  export default { viewer };
}
