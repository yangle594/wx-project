var hj = null;
if ("undefined" != typeof wx) hj = wx;
else if ("undefined" != typeof swan) hj = swan;
else {
  hj = my;
  var getSystemInfoSync = my.getSystemInfoSync;
  hj.getSystemInfoSync = function () {
    //返回系统信息
    return getSystemInfoSync()
  };
  var setStorageSync = my.setStorageSync;
  hj.setStorageSync = function (e, t) {
    //数据缓存key: e data: t
    return setStorageSync({
      key: e,
      data: t
    })
  };
  var getStorageSync = my.getStorageSync;
  hj.getStorageSync = function (e) {
    //获取本地存储key:e 的值
    var t = getStorageSync({
      key: e
    });
    return t ? t.data : t
  };
  var removeStorageSync = my.removeStorageSync;
  hj.removeStorageSync = function (e) {
      //移除数据存储key：e
      removeStorageSync({
        key: e
      })
    }, hj.request = function (e) {
      if ("get" == e.method.toLowerCase() && e.data) {
        var t = getApp().helper.objectToUrlParams(e.data, !0);
        e.url += "&" + t, e.data = null
      }
      my.httpRequest(e)
    },
    //设置页面导航条的颜色
    hj.setNavigationBarColor = function (e) {}, hj.setNavigationBarTitle = function (e) {
      e.title && my.setNavigationBar({
        title: e.title
      })
    };
  var toast = my.showToast;
  hj.showToast = function (e) {
    if (e.title) return toast({
      type: "none",
      content: e.title
    })
  };
  var previewImage = my.previewImage;
  //图片预览
  hj.previewImage = function (e) {
    if (e.current) {
      var t = e.urls.indexOf(e.current);
      return -1 == t && (t = 0), previewImage({
        current: t,
        urls: e.urls
      })
    }
    return previewImage({
      urls: e.urls
    })
  };
  //创建一个动画实例 animation。调用实例的方法来描述动画。最后通过动画实例的 export 方法导出动画数据传递给组件的 animation 属性。
  var animation = my.createAnimation;
  hj.createAnimation = function (e) {
      return animation({
        duration: e.duration ? e.duration : 400,
        timeFunction: e.timingFunction ? e.timingFunction : "linear",
        delay: e.delay ? e.delay : 0,
        transformOrigin: e.transformOrigin ? e.transformOrigin : "50% 50% 0"
      })
    },
    //显示模态对话框
    hj.showModal = function (t) {
      0 == t.showCancel ? my.alert({
        title: t.title,
        content: t.content,
        buttonText: t.confirmText ? t.confirmText : "确定",
        success: function (e) {
          t.success && t.success({
            confirm: !0,
            cancel: !1
          })
        },
        fail: t.fail,
        complete: t.complete
      }) : my.confirm({
        title: t.title,
        content: t.content,
        confirmButtonText: t.confirmText ? t.confirmText : "确定",
        cancelButtonText: t.cancelText ? t.cancelText : "取消",
        success: function (e) {
          e.confirm ? t.success({
            confirm: !0,
            cancel: !1
          }) : t.success({
            confirm: !1,
            cancel: !0
          })
        },
        fail: t.fail,
        complete: t.complete
      })
    },
    //微信支付的封装
    hj.requestPayment = function (n) {
      my.tradePay({
        tradeNO: n._res.data.trade_no || "",
        success: function (e) {},
        fail: function (e) {},
        complete: function (e) {
          var t = {};
          switch (e.resultCode = parseInt(e.resultCode), e.resultCode) {
            case 9e3:
              "function" == typeof n.success && n.success({
                errMsg: "requestPayment:ok"
              }), t.errMsg = "requestPayment:ok";
              break;
            case 6001:
            case 6002:
              "function" == typeof n.fail && n.fail({
                errMsg: "requestPayment:fail cancel"
              }), t.errMsg = "requestPayment:fail cancel";
              break;
            default:
              "function" == typeof n.fail && n.fail({
                errMsg: "requestPayment:fail"
              }), t.errMsg = "requestPayment:fail"
          }
          "function" == typeof n.complete && n.complete(t)
        }
      })
    },
    //设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s
    hj.setClipboardData = function (e) {
      e.text = e.data || "", my.setClipboard(e)
    };
  var makePhoneCall = my.makePhoneCall;
  //拨打电话
  hj.makePhoneCall = function (e) {
    e.number = e.phoneNumber || "", makePhoneCall(e)
  }, hj.getSetting = function (e) {};
  var saveImage = my.saveImage;
  //保存图片到系统相册。
  hj.saveImageToPhotosAlbum = function (t) {
    saveImage({
      url: t.filePath,
      success: t.success,
      fail: function (e) {
        e.errMsg = e.errorMessage || "", t.fail(e)
      },
      complete: t.complete
    })
  };
  var downloadFile = my.downloadFile;
  //下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径 (本地路径)，单次下载允许的最大文件为 50MB。
  hj.downloadFile = function (t) {
      downloadFile({
        url: t.url,
        success: function (e) {
          t.success({
            tempFilePath: e.apFilePath
          })
        },
        fail: t.fail,
        complete: t.complete
      })
    },
    // 设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s 
    hj.setClipboardData = function (e) {
      my.setClipboard({
        text: e.data,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      })
    };
  var chooseImage = my.chooseImage;
  //从本地相册选择图片或使用相机拍照。
  hj.chooseImage = function (a) {
    chooseImage({
      success: function (e) {
        if ("function" == typeof a.success) {
          var t = {
            tempFilePaths: [],
            tempFiles: []
          };
          for (var n in e.apFilePaths) t.tempFilePaths.push(e.apFilePaths[n]), t.tempFiles.push({
            path: e.apFilePaths[n]
          });
          a.success(t)
        }
      },
      error: function (e) {
        "function" == typeof a.error && a.error(e)
      },
      complete: function (e) {
        "function" == typeof a.complete && a.complete(e)
      }
    })
  };
  //显示操作菜单
  var showActionSheet = my.showActionSheet;
  hj.showActionSheet = function (t) {
    showActionSheet({
      items: t.itemList || [],
      success: function (e) {
        "function" == typeof t.success && t.success({
          tapIndex: e.index
        })
      }
    })
  };
  var uploadFile = my.uploadFile;
  //上传文件
  hj.uploadFile = function (e) {
    e.fileName = e.name || "", e.fileType = e.fileType || "image", uploadFile(e)
  }
}
module.exports = hj;