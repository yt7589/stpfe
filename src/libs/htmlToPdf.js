const pdfUtil = {}

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { rest } from 'lodash';
export function getCanvans(dom){
    return html2Canvas(document.querySelector(dom), {
        allowTaint: true,
        useCORS: true,
        proxy: 'https://api.map.baidu.com/images/'
    }).then(canvas => {
        return canvas;
    });
};

// 多个dom转换成一个pdf，不存在图片被分割的问题（单个图片超过一个a4纸大小未考虑）
pdfUtil.domsToPdf =async function(doms,title) {
    var domCanvas = []
    let PDF = new JsPDF('', 'pt', 'a4')
    // 未使用的页面高度
    let restPageHeight = 841.89;
    let position = 0
    for (let index = 0; index < doms.length; index++) {
        const dom = doms[index];
        // 获取canvas
        let canvas = await getCanvans(dom);
        domCanvas.push(canvas)
        // 把canvas添加到pdf
        // 图片信息
        let imgData = canvas.toDataURL('image/jpeg', 1.0);
        let canvasWidth = canvas.width
        let canvasHeight = canvas.height
        let imgWidth = 595.28
        let imgHeight = 592.28 / canvasWidth * canvasHeight
        PDF.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        restPageHeight = restPageHeight - imgHeight;
        if(index == (doms.length -1)){
          break;
        }
        if(restPageHeight>imgHeight){
          position += imgHeight
        }else{
          restPageHeight = 841,89
          PDF.addPage()
          position = 0
        }
    }
    PDF.save(title + '.pdf')
}

// 一个dom转换成一个pdf,存在图片被分割的问题
pdfUtil.domToPdf = function(title) {
  Vue.prototype.getPdf = function (title) {
    html2Canvas(document.querySelector('#pdfDom'), {
      allowTaint: true,
      useCORS: true,
      proxy: 'https://api.map.baidu.com/images/'
    }).then(function (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 592.28 / contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (contentHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (contentHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          contentHeight -= pageHeight
          position -= 841.89
          if (contentHeight > 0) {
            PDF.addPage()
          }
        }
      }
      PDF.save(title + '.pdf')
    }
    )
  }
}
export default pdfUtil