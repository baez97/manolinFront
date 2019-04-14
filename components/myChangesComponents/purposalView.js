import ChangeBox from '../homeComponents/changes/changeBox';

export default class PurposalView extends ChangeBox {
    constructor(props) {
        super(props);
    }

    handleLongPress() {
        this.props.onPressFn(this.props.parentChange, this.props.change);
    }

    getColors() {
        return ['#ffcc33', '#f2994a'];
    }

    getPrimaryFontColor() {
        return '#3f2606';        
    }
    getSecondaryFontColor() {
        return '#91620d'
    }
}