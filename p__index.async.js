(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{1:function(t,e){},2:function(t,e){},3:function(t,e){},RXBc:function(t,e,s){"use strict";s.r(e);s("BoS7");var a=s("Sdc0"),i=(s("fOrg"),s("+KLJ")),l=(s("5NDa"),s("5rEg")),n=(s("y8nQ"),s("Vl3Y")),r=(s("g9YV"),s("wCAj")),o=(s("Mwp2"),s("VXEj")),h=(s("+L6B"),s("2/Rp")),c=(s("2qtc"),s("kLXV")),p=s("p0pE"),d=s.n(p),m=s("q1tI"),u=s.n(m),g=(s("DZo9"),s("8z0m")),S=s("EUZL"),k=class extends u.a.Component{constructor(){super(),this.xlsReader=new FileReader,this.jsonReader=new FileReader,this.xlsReader.onload=(()=>{var t=S["read"](this.xlsReader.result,{type:"binary"}),e=[];for(var s in t.Sheets)if(t.Sheets.hasOwnProperty(s)){e=e.concat(S["utils"].sheet_to_json(t.Sheets[s]));break}this.props.callback(e)}),this.jsonReader.onload=(()=>{this.props.callback(JSON.parse(this.jsonReader.result))})}beforeUpload(t){return t.name.endsWith(".json")?this.jsonReader.readAsText(t):this.xlsReader.readAsBinaryString(t),!1}render(){return u.a.createElement(g["a"],{beforeUpload:t=>this.beforeUpload(t)},u.a.createElement(h["a"],null,"\u4e0a\u4f20"))}};class b extends u.a.Component{constructor(){super(),this.PID=-1,this.colorPID=-1,this.len=-1,this.state={start:!1,current:{id:0,name:"\u674e\u534e"},color:"black"}}getNum(t){return Math.floor(Math.random()*t)}start(){this.props.beforePick()&&(clearInterval(this.colorPID),this.setState({start:!0,color:"black"}),this.len=this.props.list.length,this.PID=setInterval(()=>this.toggle(),20))}toggle(){this.setState({current:this.props.list[this.getNum(this.len)]})}stop(){this.setState({start:!1}),clearInterval(this.PID),this.colorPID=setInterval(()=>this.toggleColor(),500),this.props.callback(this.state.current.id),this.props.speak&&speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.current.name))}toggleColor(){this.setState({color:"black"==this.state.color?"red":"black"})}render(){return u.a.createElement("div",null,u.a.createElement("div",{style:{fontSize:72,color:this.state.color}},this.state.current.name),u.a.createElement(h["a"],{type:"primary",size:"large",onClick:()=>this.state.start?this.stop():this.start()},this.state.start?"\u505c\u6b62":"\u5f00\u59cb"))}}b.defaultProps={list:[{id:0,name:"\u674e\u534e"}],callback:()=>{},beforePick:()=>!0,speak:!0};var E=b,v=window.localStorage;class I extends u.a.Component{constructor(){super(),this.from=null,this.settings={speak:"speechSynthesis"in window,drop:!1},void 0==v.save&&(v.save="[]"),this.form=u.a.createRef(),this.state=d()({modalImport:!1,modalSettings:!1,storage:JSON.parse(v.save),tmpTable:[],list:[],dropList:[],supportSpeak:"speechSynthesis"in window},this.settings)}showImport(){this.setState({modalImport:!0})}closeImport(){this.setState({modalImport:!1})}saveImport(){this.setState({modalImport:!1,list:this.state.tmpTable})}showSettings(){this.setState({modalSettings:!0})}closeSettings(){this.setState({modalSettings:!1}),this.form.current.resetFields()}updateSettings(){this.setState(this.settings)}saveSettings(){this.form.current.validateFields().then(t=>{this.settings=t,this.updateSettings()}).catch(t=>{console.log("Validate Failed:",t)}),this.setState({modalSettings:!1})}updateTable(t){this.setState({tmpTable:t})}dropItem(t){this.settings.drop&&this.setState({dropList:this.state.dropList.concat([t])})}checkList(){return!(this.settings.drop&&this.state.list.length-this.state.dropList.length<1)||(c["a"].confirm({title:"\u8b66\u544a",content:"\u540d\u5355\u5217\u8868\u5df2\u7a7a\uff0c\u662f\u5426\u91cd\u7f6e\uff1f",okText:"\u662f",cancelText:"\u5426",onOk:()=>{this.setState({dropList:[]})},onCancel:()=>{}}),!1)}showDebug(){var t={SpeechSynthesisUtterance:null!=SpeechSynthesisUtterance,speechSynthesis:null!=speechSynthesis};c["a"].info({content:JSON.stringify(t,null,4)})}deleteStorage(t){var e=this.state.storage.filter(e=>e.name!=t);v.save=JSON.stringify(e),this.setState({storage:e})}saveStorage(t){var e=[...this.state.storage,{name:t,data:this.state.tmpTable}];v.save=JSON.stringify(e),this.setState({storage:e})}render(){var t=[{title:"id",dataIndex:"id",key:"id"},{title:"name",dataIndex:"name",key:"name"}],e=(t,e)=>{this.setState({dropList:t})};return u.a.createElement("div",{style:{width:"90%",textAlign:"center"}},u.a.createElement("h1",null,"\u62bd\u53f7\u673a"),u.a.createElement(h["a"],{onClick:()=>this.showImport()},"\u5bfc\u5165\u5217\u8868"),u.a.createElement(h["a"],{onClick:()=>this.showSettings()},"\u8bbe\u7f6e"),0==this.state.list.length?null:u.a.createElement(E,{list:this.state.drop?this.state.list.filter(t=>!this.state.dropList.includes(t.id)):this.state.list,speak:this.state.speak,callback:t=>this.dropItem(t),beforePick:()=>this.checkList()}),u.a.createElement(c["a"],{title:"\u5bfc\u5165",visible:this.state.modalImport,onOk:()=>this.saveImport(),onCancel:()=>this.closeImport(),okText:"\u4fdd\u5b58",cancelText:"\u53d6\u6d88"},0!=this.state.storage.length?u.a.createElement(o["b"],{dataSource:this.state.storage,renderItem:t=>u.a.createElement(o["b"].Item,{actions:[u.a.createElement(h["a"],{type:"link",onClick:()=>this.deleteStorage(t.name),danger:!0},"X")]},u.a.createElement(h["a"],{type:"link",onClick:()=>this.updateTable(t.data)},t.name))}):null,u.a.createElement(k,{callback:t=>this.updateTable(t)}),u.a.createElement(r["a"],{rowKey:t=>t.id,columns:t,dataSource:this.state.tmpTable}),0!=this.state.tmpTable.length?u.a.createElement(n["a"],{onFinish:t=>this.saveStorage(t.name)},u.a.createElement(n["a"].Item,null,"\u6dfb\u52a0\u81f3\u672c\u5730\u5b58\u50a8"),u.a.createElement(n["a"].Item,{label:"\u540d\u79f0",name:"name",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u540d\u79f0\uff01"}]},u.a.createElement(l["a"],null)),u.a.createElement(n["a"].Item,null,u.a.createElement(h["a"],{htmlType:"submit"},"\u6dfb\u52a0"))):null),u.a.createElement(c["a"],{title:u.a.createElement("div",{onClick:()=>this.showDebug()},"\u8bbe\u7f6e"),visible:this.state.modalSettings,onOk:()=>this.saveSettings(),onCancel:()=>this.closeSettings(),okText:"\u4fdd\u5b58",cancelText:"\u53d6\u6d88"},this.state.supportSpeak?null:u.a.createElement(i["a"],{message:"\u517c\u5bb9\u6027\u8b66\u544a",description:"\u6b64\u6d4f\u89c8\u5668\u65e0\u6cd5\u4f7f\u7528\u6717\u8bfb\u6a21\u5f0f\uff0c\u8bf7\u66f4\u6362\u6d4f\u89c8\u5668\uff01",type:"error",showIcon:!0}),u.a.createElement(n["a"],{ref:this.form,layout:{labelCol:{span:4},wrapperCol:{span:8}},initialValues:this.settings},u.a.createElement(n["a"].Item,{label:"\u6717\u8bfb",name:"speak",valuePropName:"checked"},u.a.createElement(a["a"],{disabled:!this.state.supportSpeak})),u.a.createElement(n["a"].Item,{label:"\u81ea\u52a8\u6392\u9664",name:"drop",valuePropName:"checked"},u.a.createElement(a["a"],null)))),this.state.drop?u.a.createElement("div",null,u.a.createElement("div",null,this.state.list.length-this.state.dropList.length,"/",this.state.list.length),u.a.createElement(r["a"],{rowSelection:{onChange:e,selectedRowKeys:this.state.dropList},rowKey:t=>t.id,columns:t,dataSource:this.state.list})):null)}}e["default"]=I}}]);