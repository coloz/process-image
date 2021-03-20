var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var filePath = path.resolve('E:\\arduino.cn_20210210_235652\\data\\attachment\\forum');
var images = require("images");

fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if (isFile) {
                            let extname = path.extname(filedir)
                            if (extname == '.png' || extname == '.jpg')
                                if (stats.size > 512000) {
                                    // console.log(filedir);
                                    try {


                                        let img = images(filedir)
                                        if (img.size().width > 1024) {
                                            console.log(filedir,img.size());
                                        }
                                        //  else {
                                        //     if (extname == '.jpg')
                                        //         img.save(filedir, {
                                        //             quality: 60
                                        //         })
                                        //     else {
                                        //         img.size(parseInt(img.size().width * 0.8)).save(filedir)
                                        //     }
                                        // }
                                    } catch (error) {
                                        console.log('error:',filedir);
                                        // console.log(error);
                                    }
                                }

                            // 读取文件内容
                            // var content = fs.readFileSync(filedir, 'utf-8');
                            // console.log(content);
                        }
                        if (isDir) {
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}