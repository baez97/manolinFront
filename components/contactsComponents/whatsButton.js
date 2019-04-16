import ContactButton from './contactButton';

export default class WhatsButton extends ContactButton {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    text="WhatsApp";
    urlString = "https://wa.me/34";

    getColors() {
        return ['#03cd46', '#03a73a']
    }

    getImage() {
        return require('../../assets/whatsSilhouette.png');
    }
}