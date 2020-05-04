import react from 'react';
import { Button,Upload } from 'antd'; 
import * as XLSX from 'xlsx';

export default class extends react.Component {

	xlsReader = new FileReader();
	jsonReader = new FileReader();

	constructor() {
		super();
		this.xlsReader.onload = ()=> {
			var workbook = XLSX.read(this.xlsReader.result, { type: 'binary' });
			var data = [];
			for (const sheet in workbook.Sheets) {
				if (workbook.Sheets.hasOwnProperty(sheet)) {
					data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
					break;
				}
			}
			this.props.callback(data);
		};
		this.jsonReader.onload = ()=> {
			this.props.callback(JSON.parse(this.jsonReader.result));
		};
	}

	beforeUpload(f) {
		if(f.name.endsWith('.json')) {
			this.jsonReader.readAsText(f);
		} else {
			this.xlsReader.readAsBinaryString(f);
		}
		return false;
	}

	render() {
		return (
			<Upload beforeUpload={(file)=>this.beforeUpload(file)}>
			<Button>上传</Button>
			</Upload>
		);
	}

}

