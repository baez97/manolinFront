import { widthPercentageToDP  as wp, 
         heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
const width  = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// REFERENCE WIDTH:  423.5293998850261
// REFERENCE HEIGHT: 752.9411553511576

const layoutStyle = {
    maxWidth          : wp('95%'),
    mediumWidth       : wp('44.86111236943%'),
    imageWidth        : wp('23.61111177338%'),
    inputWidth        : wp('85.00000238419%'),
    modalWidth        : wp('80.27778002951%'),
    modalButtonWidth  : wp('59.02777943346%'),
    deckHeight        : hp('11.95%'),
    globalHeight      : hp('15.93750044703%'),
    mediumHeight      : hp('10.62500029802%'),
    imageHeight       : hp('13.28125037253%'),
    modalButtonHeight : hp('10.62500029802%'),
    borderRadius      : wp('4.72222235468%'),

    turnWidth         : wp('12.98611147536%'),
    turnColWidth      : wp('11.80555588669%'),
    turnTableWidth    : wp('70.83333532015'),
    dayHeight         : hp('3.98437511176%'),
    turnHeight        : hp('7.96875022352%'),
    turnTableHeight   : hp('70.3906269744'),
    
    horizontalUnits10 : wp('2.36111117734%'),
    verticalUnits10   : hp('1.328125037253%'),

    primaryFontSize   : width / 19.251336358410278, // 22
    bigFontSize       : width / 14.11764666283,     // 30
    largeFontSize     : width / 7.05882333142,      // 60
    hugeFontSize      : width / 18.41432173413,     // 23
    smallFontSize     : width / 21.17646999425,     // 20
    tinyFontSize      : width / 23.52941110472      // 18
}

export default layoutStyle