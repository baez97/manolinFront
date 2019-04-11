import ChangeBox from './changeBox';

export default class FreeBox extends ChangeBox {
    constructor(props) {
        super(props);
    }

    getType() {
        return "Librar";
    }

    handleLongPress() {
        this.props.freeOnPress(this.props.change);
    }
}