import OperatorNode from 'nodes/math/OperatorNode.js';
import MathNode from 'nodes/math/MathNode.js';
import CondNode from 'nodes/math/CondNode.js';
import SplitNode from 'nodes/utils/SplitNode.js';
import JoinNode from 'nodes/utils/JoinNode.js';
import createConstantNode from './ConstantNode.js';
import makeVarNode from './makeVarNode.js';
import {ZERO, ONE, TWO, TWO_PI} from './ConstantNodes.js';
import {uv} from './AttributeNodes.js';
import {resolution, frameCounter} from './UniformNodes.js';

const INTEGER_ONE = createConstantNode(1);

const ONE_OVER_MAX_UINT = createConstantNode(1 / (2 ** 32 - 1));
const ONE_OVER_POW      = createConstantNode(1 / 2 ** 32);

const FIVE   = createConstantNode(5);
const TWENTY = createConstantNode(20);
const FIFTY  = createConstantNode(50);
const n250   = createConstantNode(250);
const n12500 = createConstantNode(12500);

const FOUR = createConstantNode(4,          false, false);
const n22  = createConstantNode(22,         false, false);
const n28  = createConstantNode(28,         false, false);
const n27e = createConstantNode(277803737,  false, false);
const n28e = createConstantNode(2891336453, false, false);
const n74e = createConstantNode(747796405,  false, false);

const seed = makeVarNode(new OperatorNode('+',
	new OperatorNode('+',
		new OperatorNode('*', n12500, new OperatorNode('%', frameCounter, TWENTY)),
		new OperatorNode('*', n250, new OperatorNode('%',
			new MathNode(MathNode.FLOOR, new OperatorNode('*', new SplitNode(uv, 'x'), new SplitNode(resolution, 'x'))),
			FIFTY
		))
	),
	new OperatorNode('*', FIVE, new OperatorNode('%',
		new MathNode(MathNode.FLOOR, new OperatorNode('*', new SplitNode(uv, 'y'), new SplitNode(resolution, 'y'))),
		FIFTY
	))
));

function hash(num) { //taken from pcg-random.org
	const state = makeVarNode(new OperatorNode('+', new OperatorNode('*', num, n74e), n28e));
	const word = makeVarNode(new OperatorNode('*',
		new OperatorNode('^',
			new OperatorNode('>>',
				state,
				new OperatorNode('+', new OperatorNode('>>', state, n28), FOUR)
			),
			state
		),
		n27e
	));
	return makeVarNode(
		new MathNode('float', new OperatorNode('^',
			new OperatorNode('>>', word, n22),
			word
		)
	);
}

function getNextHash() {
	return hash(makeVarNode(new OperatorNode('=', seed, new OperatorNode('+', seed, INTEGER_ONE))));
}

export default function random() { //returns a value between 0 (inclusive) and 1 (exclusive)
	return new OperatorNode('/', getNextHash(), ONE_OVER_POW);
}

export default function randomInclusive() { //returns a value between 0 (inclusive) and 1 (inclusive)
	return new OperatorNode('/', getNextHash(), ONE_OVER_MAX_UINT);
}

export default function randomDirection() { //based on https://mathworld.wolfram.com/SpherePointPicking.html
	const u = makeVarNode(new OperatorNode('-', new OperatorNode('*', TWO, randomInclusive()), ONE));
	const root = makeVarNode(new MathNode(MathNode.SQRT, new OperatorNode('-', ONE, new OperatorNode('*', u, u))));
	const theta = makeVarNode(new OperatorNode('*', TWO_PI, random()));
	return makeVarNode(new JoinNode([
		new OperatorNode('*', root, new MathNode(MathNode.COS, theta)),
		new OperatorNode('*', root, new MathNode(MathNode.SIN, theta)),
		u
	]));
}

export default function randomHemisphereDirection(normal) {
	const direction = randomDirection();
	const cond = new OperatorNode('>=', new MathNode(MathNode.DOT, direction, normal), ZERO);
	return makeVarNode(new CondNode(cond, normal, new MathNode(MathNode.NEGATE, normal)));
}