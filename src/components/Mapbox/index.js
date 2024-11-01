import * as GeoTIFF from 'geotiff';
import WindLayer from '@jindin/mapbox-gl-wind-layer';

export async function getImage(map, tiff, layer) {
    const image = await tiff.getImage();
    let bbox = await image.getBoundingBox();
    let data = await image.readRasters({
      // samples: rgbBands // 波段数量，一个波段：[0]，三个波段：[2,1,0]
      
      samples: [0] // 波段数量，一个波段：[0]，三个波段：[2,1,0]
    });
    console.log(data)
    let base64Image = getBase64Image(data)
    addToMapboxgl(map, base64Image,bbox, layer)
  };

  export async function getImageAndJump(map, tiff, layer,zoom) {
    const image = await tiff.getImage();
    let bbox = await image.getBoundingBox();
    let data = await image.readRasters({
      // samples: rgbBands // 波段数量，一个波段：[0]，三个波段：[2,1,0]
      
      samples: [0] // 波段数量，一个波段：[0]，三个波段：[2,1,0]
    });
    console.log(data)
    const lng = (bbox[0] + bbox[2]) / 2;
    const lat = (bbox[1] + bbox[3]) / 2;
    let base64Image = null;
    if(layer.indexOf('wind') > -1) {
      // base64Image = getBase64Image(data);
      base64Image = getBase64ImageAndSetWindDirection(data);
      jumpTo(map,bbox[0]-2,lat,zoom);
    } else {
      base64Image = getBase64Image(data);
      jumpTo(map,bbox[0],lat,zoom);
    }
    
    // jumpTo(map,lng,lat,zoom);
    addToMapboxgl(map, base64Image,bbox, layer);
  };

  export async function getImageWindTest(map, tiff, layer) {
    const image = await tiff.getImage();
    let bbox = await image.getBoundingBox();
    let data = await image.readRasters({
      // samples: rgbBands // 波段数量，一个波段：[0]，三个波段：[2,1,0]
      
      samples: [0] // 波段数量，一个波段：[0]，三个波段：[2,1,0]
    });
    console.log(data)
    const windLayer = new WindLayer({
      id: `layer-${layer}`,
      name: "风场图层", // 可选
      data: data, //风场数据
      windyOptions: {
        //封藏配置
        lineWidth: 1, // 风线宽度
        minVelocity: 0,
        maxVelocity: 10,
        particleAge: 90,
        particleMultiplier: 1 / 100,
        opacity: 0.97,
        frameRate: 15,
      },
    });
    if(!map.getSource(layer)){
      map.addLayer(windLayer);
    } else {
      map.getSource(layer).updateImage({
        url:image,
        coordinates: [
          [bbox[0],bbox[3]],
          [bbox[2],bbox[3]],
          [bbox[2],bbox[1]],
          [bbox[0],bbox[1]],
        ]
      })
    }
  };


  const getBase64Image = (data, fn) => {
    let thumbnailPixelHeight = data.height
    let thumbnailPixelWidth = data.width
    let canvas = document.createElement('canvas')
    canvas.width = thumbnailPixelWidth
    canvas.height = thumbnailPixelHeight
    let ctx = canvas.getContext("2d")
    let totalPixelCount = 0
    for (let y = 0; y < thumbnailPixelHeight; y++) {
      for (let x = 0; x < thumbnailPixelWidth; x++) {
        let colour = 'rgb(0, 0, 0, 0)' // let the default be no data (transparent)
        // 根据灰度值所在范围渲染颜色
        if (data[0][totalPixelCount] > 0) {
            // if (data[0][totalPixelCount] > 10 && data[0][totalPixelCount] <= 20) {
            //   colour = `rgb(15, 255, 0, 1)`
            // } else if(data[0][totalPixelCount] > 50 && data[0][totalPixelCount] <= 55) {
            //   colour = `rgb(15, 255, 0, 1)`
            // } else if (data[0][totalPixelCount] > 55 && data[0][totalPixelCount] <= 60) {
            //   colour = `rgb(155, 255, 0, 1)`
            // } else if (data[0][totalPixelCount] > 60 && data[0][totalPixelCount] <= 65) {
            //   colour = `rgb(255, 255, 0, 1)`
            // } else {
            //   colour = `rgb(255, 255, 0, 1)`
            // }
            if(fn) {
              colour = fn(data[0][totalPixelCount])
            } else {
              colour = getColorByPercent(data[0][totalPixelCount]*5, 30);
            }           
        }
        ctx.fillStyle = colour
        ctx.fillRect(x, y, 1, 1)
        totalPixelCount++
      }
    }
    let canvasImage = canvas.toDataURL("image/png")
    return canvasImage
  };

  const getBase64ImageAndSetWindDirection = (data, fn) => {
    let thumbnailPixelHeight = data.height
    let thumbnailPixelWidth = data.width
    let canvas = document.createElement('canvas')
    canvas.width = thumbnailPixelWidth
    canvas.height = thumbnailPixelHeight
    let ctx = canvas.getContext("2d")
    let totalPixelCount = 0;
    const interval = 10;
    for (let y = 1; y < thumbnailPixelHeight - 1; y+=interval) {
      for (let x = 1; x < thumbnailPixelWidth - 1; x+=interval) {
        let colour = 'rgb(0, 0, 0, 0)' // let the default be no data (transparent)
        // 根据灰度值所在范围渲染颜色
        const direction = data[0][totalPixelCount];
        let fromX = x, fromY = y, toX = x, toY = y;
        let unit = 1;
        if(direction > 0 && direction <= 90) {
          fromX += Math.sin(direction)*unit;
          toX -= Math.sin(direction)*unit;
          fromY -= Math.cos(direction)*unit;
          toY += Math.cos(direction)*unit;
        } else if (direction > 90 && direction <= 180) {
          fromX += Math.sin(direction)*unit;
          toX -= Math.sin(direction)*unit;
          fromY += Math.cos(direction)*unit;
          toY -= Math.cos(direction)*unit
        } else if (direction > 180 && direction <= 270) {
          fromX -= Math.sin(direction)*unit;
          toX += Math.sin(direction)*unit;
          fromY += Math.cos(direction)*unit;
          toY -= Math.cos(direction)*unit
        } else if (direction > 270 && direction <= 360) {
          fromX -= Math.sin(direction)*unit;
          toX += Math.sin(direction)*unit;
          fromY -= Math.cos(direction)*unit;
          toY += Math.cos(direction)*unit
        }
        // colour = getColorByPercent(data[0][totalPixelCount]*5, 30);
        setWindDirection(ctx, fromX, fromY, toX, toY, 10, 2, 0.5, 'white');
        totalPixelCount+=interval;
      }
    }
    let canvasImage = canvas.toDataURL("image/png")
    console.log('wind ready')
    return canvasImage
  };
  // 将图片添加到地图
  export const addToMapboxgl = (map,image,bbox,layer) => {
    // bbox = [120,20,140,40]
    if(!map.getSource(layer)){
      map.addSource(layer, {
        "type": "image",
        "url": image,
        "coordinates": [
          [bbox[0],bbox[3]],
          [bbox[2],bbox[3]],
          [bbox[2],bbox[1]],
          [bbox[0],bbox[1]],
        ]
      });
      map.addLayer({
        id: `layer-${layer}`,
        'type': 'raster',
        'source': layer,
        'paint': {
          'raster-fade-duration': 0
        }
      });
    }else{
      map.getSource(layer).updateImage({
        url:image,
        coordinates: [
          [bbox[0],bbox[3]],
          [bbox[2],bbox[3]],
          [bbox[2],bbox[1]],
          [bbox[0],bbox[1]],
        ]
      })
    }
    // map.controlLayerLocation({
    //   type:'image',
    //   id:'tiff-source'
    // },map)
  };

  //自动跳转到指定位置
  const jumpTo = (map,lng,lat,zoom=8) => {
    map.flyTo({
      center: [lng,lat],
      zoom: zoom
    });
  }

  const getColorByPercent = (rawBili, settingValue = 50) => {
    //var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内
    let one = (255+255) / 100;  //5.1*50=255
    let r=0;
    let g=0;
    let b=0;

    const bili = Math.round(rawBili);
    
    if ( bili < settingValue ) { 
        // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
        g = one * bili;
        b=255;
    }
    if ( bili >= settingValue && bili < 1.5 * settingValue ) {
      // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
      b =  255 - ( (bili - settingValue ) * one) ;
      g = 255;
    }
    if ( bili >= 1.5 * settingValue && bili < 2 * settingValue ) {
        // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
        r =  (bili - settingValue ) * one ;
        g = 255;
    }
    if ( bili >= 2 * settingValue ) {
      // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
      g =  255 - ( (bili - 2 * settingValue ) * one) ;
      r = 255;
  }
    r = parseInt(r);// 取整
    g = parseInt(g);// 取整
    b = parseInt(b);// 取整
 
    //console.log("#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2));
    //return "#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2);
    //console.log("rgb("+r+","+g+","+b+")" );
    return "rgb("+r+","+g+","+b+", 0.6)";
  }

  const getColorByWindSpeed = (speed) => {
    let r = 0, g = 0, b = 0;
    //5m/s内为蓝色，5-10m/s内为蓝变绿色，10-20m/s内为绿变黄色，20-30m/s内为橙色，30m/s以上为红色
    const rate = 255 / 10;
    if ( speed < 5) {
        const blueRate = 100 / 5;
        g=155 + Math.round(blueRate * speed);
        b=255
    } else if (speed > 5 && speed < 10) {
        b = 255 - Math.round((speed - 5) * rate * 2);
        g = 255;
    } else if (speed > 10 && speed < 20) {
        g = 255;
        r = Math.round((speed - 10) * rate);
    } else if (speed > 20 && speed < 30) {
        r = 255;
        g = 255 - Math.round((speed - 20) * rate);
    } else if (speed > 30) {
        const blueRate = 150 / 10;
        r = 255;
        b = 150 - Math.round((speed - 30) * blueRate);
    } else {
        r= 255;
    }
    return "rgb("+r+","+g+","+b+", 0.6)";
  }

  const setWindDirection = (ctx, fromX, fromY, toX, toY, theta, headlen, width, color) => {
    theta = typeof(theta) != 'undefined' ? theta : 30;
    headlen = typeof(theta) != 'undefined' ? headlen : 10;
    width = typeof(width) != 'undefined' ? width : 1;
    color = typeof(color) != 'color' ? color : '#000';
 
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
 
 
    ctx.save();
    ctx.beginPath();
 
    var arrowX = fromX - topX,
        arrowY = fromY - topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(fromX, fromY);
    arrowX = fromX - botX;
    arrowY = fromY - botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
 
    // Reverse length on the other side
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}
