const fs = require('fs');
const path = require('path');

function getFileByPath(fpath, successCallback, errCallback) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) {
            return errCallback(err);
        }
        successCallback(dataStr);
    })
}
// getFileByPath(path.join(__dirname, './files/1.txt'), function (data) {
//         console.log(data + "=====");
//     }, function (err) {
//         console.log(err.message);
//     }
// );

// 需求： 先读取文件1， 再读取文件2，最后再读取文件3
// 回调地狱（超过3层）
// 使用 Es6 中的 Promise，来解决 回调地狱的问题；
// 问： Promise 的本质是要干什么的？ 就是单纯的为了解决回调地狱问题；并不能帮我们减少代码量；
getFileByPath(path.join(__dirname, './files/1.txt'), function (data) {
        console.log(data + "=====");
        getFileByPath(path.join(__dirname, './files/2.txt'), function (data) {
            console.log(data + "=====");

            getFileByPath(path.join(__dirname, './files/3.txt'), function (data) {
                console.log(data + "=====");
        
            }, function (err) {
                console.log(err.message);
            }
        );
            
        }, function (err) {
            console.log(err.message);
        }
    );

    }, function (err) {
        console.log(err.message);
    }
);


// getFileByPath(path.join(__dirname, './files/1.txt'), (err,dataStr) => {
//     if(err) return console.log(err.message)
//     console.log(dataStr + "=====");
// });