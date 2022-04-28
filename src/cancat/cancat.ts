import XLSX from 'xlsx';
import xlsx from 'node-xlsx';

export class cancat {
    can(files){
        let buffer = files[0].buffer
        let buff = files[1].buffer
        const data1 = xlsx.parse(buffer);
        const data = [
            [1, 2, 3],
            [true, false, null, 'sheetjs'],
            ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
            ['baz', null, 'qux'],
          ];
          var bufferr = xlsx.build([{name: 'mySheetName', data: data}]);
    }
}

