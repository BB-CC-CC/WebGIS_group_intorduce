document.addEventListener('DOMContentLoaded', function() {
    const tk = 'ea8e2848fffec1c40ceb139b88eae916';
    
    // 创建天地图图层
    const vectorLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: `https://t0.tianditu.gov.cn/vec_w/wmts?layer=vec&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${tk}`,
            projection: 'EPSG:3857'
        })
    });

    const vectorAnnotationLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: `https://t0.tianditu.gov.cn/cva_w/wmts?layer=cva&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${tk}`,
            projection: 'EPSG:3857'
        })
    });

    const imageLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: `https://t0.tianditu.gov.cn/img_w/wmts?layer=img&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${tk}`,
            projection: 'EPSG:3857'
        }),
        visible: false
    });

    const imageAnnotationLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: `https://t0.tianditu.gov.cn/cia_w/wmts?layer=cia&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${tk}`,
            projection: 'EPSG:3857'
        }),
        visible: false
    });

    // 创建地图
    const map = new ol.Map({
        target: 'map',
        layers: [
            vectorLayer,
            vectorAnnotationLayer,
            imageLayer,
            imageAnnotationLayer
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([114.3575, 30.5355]), // 武汉大学坐标
            zoom: 14.5,  // 最佳观测级别
            projection: 'EPSG:3857',
            maxZoom: 18,
            minZoom: 3
        })
    });

    // 图层切换控制（保持不变）
    const layerSwitcher = document.querySelectorAll('input[name="base-layer"]');
    layerSwitcher.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'vector') {
                vectorLayer.setVisible(true);
                vectorAnnotationLayer.setVisible(true);
                imageLayer.setVisible(false);
                imageAnnotationLayer.setVisible(false);
            } else {
                vectorLayer.setVisible(false);
                vectorAnnotationLayer.setVisible(false);
                imageLayer.setVisible(true);
                imageAnnotationLayer.setVisible(true);
            }
        });
    });
});