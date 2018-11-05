
import { Quill } from 'react-quill';
var Parchment = Quill.import("parchment")
const levels = [1, 2, 3, 4, 5];
const multiplier = 2;

class IndentAttributor extends Parchment.Attributor.Style {
	add(node, value) {
		return super.add(node, `${value * multiplier}em`);
	}

	value(node) {
		return parseFloat(super.value(node)) / multiplier || undefined; // Don't return NaN
	}
}

export default IndentAttributor