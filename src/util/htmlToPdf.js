// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
    install (Vue, options) {
        Vue.prototype.getPdf = function () {
            var title = this.htmlTitle
            var pdfDom = this.pdfDom
            html2Canvas(document.querySelector('#'+pdfDom+''), {
                // allowTaint: true,
                scale:1.411,
            }).then(function (canvas) {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89
                let leftHeight = contentHeight
                let position = 0
                let imgWidth = 595.28
                let imgHeight = 595.28 / contentWidth * contentHeight
                // console.log('contentWidth:'+contentWidth)
                // console.log('contentHeight:'+contentHeight)
                // console.log('pageHeight:'+pageHeight)
                // console.log('leftHeight:'+leftHeight)
                // console.log('imgWidth:'+imgWidth)
                // console.log('imgHeight:'+imgHeight)
                // console.log(canvas)
                // console.log('canvas.width:'+canvas.width)
                // console.log('canvas.height:'+canvas.height)
                // document.body.appendChild(canvas)
                let pageData = canvas.toDataURL('image/jpeg', 1)

                let PDF = new JsPDF('', 'pt', 'a4')
                // var newImg = document.createElement('img')
                // newImg.src= pageData
                // document.body.appendChild(newImg)
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 841.89
                        if (leftHeight > 0) {
                            PDF.addPage()
                        }
                    }
                }
                PDF.save(title + '.pdf')
            })
        }
    }
}
