const fs = require('fs');

const { unionBy } = require('lodash');

// 获取文件夹下所有文件名的相对路劲
function readFolderFun(folderSrc) {
  try {
    const newFileList = [];
    const fileList = fs.readdirSync(folderSrc);
    for(let i = 0; i<fileList.length; i++) {
      const stats = fs.statSync(`${folderSrc}/${fileList[i]}`)
      var isDir = stats.isDirectory();
      var isFile = stats.isFile();
      if(isDir) {
        readFolderFun(`${folderSrc}/${fileList[i]}`);
      }
      if(isFile) {
        newFileList.push(`${folderSrc}/${fileList[i]}`);
      }
    }
    return newFileList;
  } catch(err) {
    console.log(err);
  }

}

function readFileFun(PATH) {
  const fileList = readFolderFun(PATH);
  let dataString = "";
  for(let i = 0; i<fileList.length; i++) {
    const data = fs.readFileSync(fileList[i], 'utf8');
    // const newData = data.replace(/[\r\n]/g, "").replace(/\s+/g, "")
    const newData = data.replace(/\ +/g,"").replace(/[\r\n]/g,"");
    dataString = dataString + newData;
  }

  const dataArray = dataString.split('get(`${promptCode}.').map(item => {
      const res = item.split("')");
      if(res[1]) {
        return res[0]
      }
    }
  ).filter(item=>item);
  let dataMap = [];
  dataArray.forEach(item => {
    const temp = item.split("`).d('");
    if(temp[0] && temp[1]) {
      dataMap = [
        {
          prompt_code: temp[0],
          description: temp[1],
        },
        ...dataMap,
      ];
    }
  });
  fs.writeFileSync('国际化.json', JSON.stringify(dataMap));
  return unionBy(dataMap, 'prompt_code');
}

exports.readFileFun = readFileFun;
// readFileFun();