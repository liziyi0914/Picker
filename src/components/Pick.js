import react from 'react';
import { Button } from 'antd';

class Pick extends react.Component {

	static defaultProps = {
		list: [{id:0,name:"李华"}],
		callback: ()=>{},
		beforePick: ()=>true,
		speak: true
	};

	PID = -1;
	colorPID = -1;
	len = -1;

	constructor() {
		super();
		this.state = {
			start: false,
			current: {id:0,name:"李华"},
			color: "black"
		};
	}

	getNum(max) {
		return Math.floor(Math.random()*max);
	}

	start() {
		if(!this.props.beforePick()) {
			return;
		}
		clearInterval(this.colorPID);
		this.setState({start:true,color:"black"});
		this.len = this.props.list.length;
		this.PID = setInterval(()=>this.toggle(),20);
	}

	toggle() {
		this.setState({current:this.props.list[this.getNum(this.len)]});
	}

	stop() {
		this.setState({start:false});
		clearInterval(this.PID);
		this.colorPID = setInterval(()=>this.toggleColor(),500);
		this.props.callback(this.state.current.id);
		if(this.props.speak) {
			speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.current.name));
		}
	}

	toggleColor() {
		this.setState({color:this.state.color=="black"?"red":"black"});
	}

	render() {
		return (
		<div>
			<div style={{fontSize:72,color:this.state.color}}>{this.state.current.name}</div>
			<Button type="primary" size="large" onClick={()=>this.state.start?this.stop():this.start()}>{this.state.start?"停止":"开始"}</Button>
		</div>
		);
	}

}

export default Pick;
