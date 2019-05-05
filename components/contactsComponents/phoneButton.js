import ContactButton from './contactButton';
import LayoutStyle from '../../styles/layoutStyle';

export default class PhoneButton extends ContactButton {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    text="Llamar";
    urlString = "tel:+34";

    getColors() {
        return ['#10bad2', '#0470dc']
    }

    getImage() {
        return require('../../assets/phone.png');
    }

    getImageStyle() {
        return {
            height : LayoutStyle.verticalUnits10   * 8,
            width  : LayoutStyle.horizontalUnits10 * 8
        }
    }
}