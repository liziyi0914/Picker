import React from 'react';
import {
	Button,
	Modal,
	Input,
	Table,
	Form,
	Switch,
	Alert,
	List
} from 'antd';
import Upload from '../components/Upload';
import Pick from '../components/Pick';

var localStorage = window.localStorage;

class IndexPage extends React.Component {

	from = null;
	settings = {
		speak: 'speechSynthesis' in window,
		drop: false
	};

	constructor() {
		super();
		if(localStorage.save==undefined) {
			localStorage.save = '[]';
		}
		this.form = React.createRef();
		this.state = {
			modalImport: false,
			modalSettings: false,
			storage: JSON.parse(localStorage.save),
			tmpTable: [],
			list: [],
			dropList: [],
			supportSpeak: 'speechSynthesis' in window,
			...this.settings
		};
	}

	showImport() {
		this.setState({modalImport:true});
	}

	closeImport() {
		this.setState({modalImport:false});
	}

	saveImport() {
		this.setState({modalImport:false,list:this.state.tmpTable});
	}

	showSettings() {
		this.setState({modalSettings:true});
	}

	closeSettings() {
		this.setState({modalSettings:false});
		this.form.current.resetFields();
	}

	updateSettings() {
		this.setState(this.settings);
	}

	saveSettings() {
		this.form.current
			.validateFields()
		    .then(values => {
				this.settings = values;
				this.updateSettings();
			})
		    .catch(info => {
				console.log('Validate Failed:', info);
			});
		this.setState({modalSettings:false});
	}

	updateTable(data) {
		this.setState({tmpTable:data});
	}

	dropItem(id) {
		if(this.settings.drop) {
			this.setState({
				dropList: this.state.dropList.concat([id])
			});
		}
	}

	checkList() {
		if(this.settings.drop) {
			if(this.state.list.length-this.state.dropList.length<1) {
				Modal.confirm({
					title: "警告",
					content: "名单列表已空，是否重置？",
					okText: "是",
					cancelText: "否",
					onOk: ()=> {
						this.setState({dropList: []});
					},
					onCancel: ()=> {
					}
				});
				return false;
			}
		}
		return true;
	}

	showDebug() {
		var debug = {
			SpeechSynthesisUtterance: SpeechSynthesisUtterance!=null,
			speechSynthesis: speechSynthesis!=null
		};
		Modal.info({content:JSON.stringify(debug,null,4)});
	}

	deleteStorage(name) {
		var tmp = this.state.storage.filter(item=>item.name!=name);
		localStorage.save = JSON.stringify(tmp);
		this.setState({storage:tmp});
	}

	saveStorage(name) {
		var tmp = [...this.state.storage,{name:name,data:this.state.tmpTable}];
		localStorage.save = JSON.stringify(tmp);
		this.setState({storage:tmp});
	}

	render() {
		var cols = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id'
			},
			{
				title: 'name',
				dataIndex: 'name',
				key: 'name'
			}
		];
		var handleChange = (selectedRowKeys, selectedRows) => {
				this.setState({dropList: selectedRowKeys});
			};
		return (
		<div style={{width:'90%',textAlign:'center'}}>
			<h1>抽号机</h1>
			<Button onClick={()=>this.showImport()}>导入列表</Button>
			<Button onClick={()=>this.showSettings()}>设置</Button>
			{this.state.list.length==0?null:(<Pick list={this.state.drop?this.state.list.filter(i=>!this.state.dropList.includes(i.id)):this.state.list} speak={this.state.speak} callback={(id)=>this.dropItem(id)} beforePick={()=>this.checkList()}/>)}
			<Modal
				title="导入"
				visible={this.state.modalImport}
				onOk={()=>this.saveImport()}
				onCancel={()=>this.closeImport()}
				okText="保存"
				cancelText="取消"
			>
			{this.state.storage.length!=0?(
				<List
					dataSource={this.state.storage}
					renderItem={item => (
						<List.Item
							actions={[<Button type="link" onClick={()=>this.deleteStorage(item.name)} danger>X</Button>]}
				        >
							<Button type="link" onClick={()=>this.updateTable(item.data)}>{item.name}</Button>
				        </List.Item>
				    )}
				/>
			):null}
				<Upload callback={(data)=>this.updateTable(data)} />
				<Table rowKey={record=>record.id} columns={cols} dataSource={this.state.tmpTable}/>
				{this.state.tmpTable.length!=0?(
				<Form
					onFinish={data=>this.saveStorage(data.name)}
				>
					<Form.Item>添加至本地存储</Form.Item>
					<Form.Item
						label="名称"
						name="name"
						rules={[{required:true,message:"请输入名称！"}]}
					><Input/></Form.Item>
					<Form.Item>
						<Button htmlType="submit">添加</Button>
					</Form.Item>
				</Form>
				):null}
			</Modal>
			<Modal
				title={<div onClick={()=>this.showDebug()}>设置</div>}
				visible={this.state.modalSettings}
				onOk={()=>this.saveSettings()}
				onCancel={()=>this.closeSettings()}
				okText={"保存"}
				cancelText={"取消"}
			>
				{this.state.supportSpeak?null:<Alert message="兼容性警告" description="此浏览器无法使用朗读模式，请更换浏览器！" type="error" showIcon/>}
				<Form ref={this.form} layout={{labelCol:{span:4},wrapperCol:{span:8}}} initialValues={this.settings}>
					<Form.Item label="朗读" name="speak" valuePropName="checked"><Switch disabled={!this.state.supportSpeak}/></Form.Item>
					<Form.Item label="自动排除" name="drop" valuePropName="checked"><Switch/></Form.Item>
				</Form>
			</Modal>
			{this.state.drop?(<div>
			<div>{this.state.list.length-this.state.dropList.length}/{this.state.list.length}</div>
			<Table
				rowSelection={{onChange:handleChange,selectedRowKeys:this.state.dropList}}
				rowKey={record=>record.id}
				columns={cols}
				dataSource={this.state.list}
			/>
					</div>):null
			}
		</div>
		);
	}

}

export default IndexPage;
