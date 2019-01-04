export default class ParticleSimDisplay extends React.Component {
	constructor(props) {
		this.particleField = props.particleField;
	}
	componentDidMount() {
		this.updateCanvas();
	    }
    	updateCanvas() {
		const ctx = this.refs.canvas.getContext('2d');
		ctx.fillRect(0,0, 100, 100);
    	}
	render() {
		return (
			<canvas ref="canvas" width={300} height={300}/>
		);
	}
}
