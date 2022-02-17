import InputNode from 'nodes/core/InputNode.js';

class BoolNode extends InputNode {

	constructor( value = false ) {

		super( 'bool' );

		this.value = value;

	}

}

BoolNode.prototype.isBoolNode = true;

export default BoolNode;