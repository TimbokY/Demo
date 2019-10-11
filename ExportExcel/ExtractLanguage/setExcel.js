// const YAML = require('yamljs');
const excelPort = require('excel-export');
const fs = require("fs");
const path = require('path');
const { readFileFun } = require('./getJson');

// 国际化文件
const PATH = '../../../../Project/hzero-platform-fe/src/routes/sfin/AutoAccount';
// 国际化code值
const promptCode = 'sfin.payableInvoice';

exports.write = function(req, res, next) {
  const data = readFileFun(PATH);
  const conf = {};
  const filename = 'export-'; //只支持字母和数字命名

  // conf.stylesXmlFile = "./excelTemplate.xml";
  // conf.name = "平台多语言";
  conf.cols = [
    {
      caption: '*prompt_id',
      type: 'string',
      width: 16.43,
    }, 
    {
      caption: '#tenant_id',
      type: 'number',
      width: 16.43,
    },
    {
      caption: '#prompt_key',
      type: 'string',
      width: 44.43,
    },
    {
      caption: '#prompt_code',
      type: 'string',
      width: 44.43,
    },
    {
      caption: 'description',
      type: 'string',
      width: 44.43,
    }
    ];

  // const yamlDataKey = Object.keys(yamlData[promptCode]);
  // const yamlDataValue = Object.values(yamlData[promptCode]);

  const array = data.map((item, index)=>{
    return ['*', 0, promptCode, item.prompt_code, item.description];
  });


  conf.rows = array;
  const result = excelPort.execute(conf);

  const random = `${new Date().toLocaleDateString()}`;

  const uploadDir = '../Excel/';
  const filePath = uploadDir + filename + random + ".xlsx";

  fs.writeFile(filePath, result, 'binary', function(err) {
      if (err) {
          console.log(err);
      }
  });
}

exports.write();