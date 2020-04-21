const YAML = require('yamljs');
const excelPort = require('excel-export');
const fs = require("fs");
const path = require('path');

// 国际化code值
const promptCode = 'spcm.common';

exports.write = function(req, res, next) {
  const yamlData = YAML.parse(fs.readFileSync('./index.yml').toString());
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

  const yamlDataKey = Object.keys(yamlData[promptCode]);
  const yamlDataValue = Object.values(yamlData[promptCode]);

  const array = yamlDataKey.map((item, index)=>{
    return ['*', 0, promptCode, yamlDataValue[index], item];
  });


  conf.rows = array;
  const result = excelPort.execute(conf);

  const random = `${new Date().toLocaleDateString()}`;

  const uploadDir = 'Excel/';
  const filePath = uploadDir + filename + random + ".xlsx";

  fs.writeFile(filePath, result, 'binary', function(err) {
      if (err) {
          console.log(err);
      }
  });
}

exports.write();