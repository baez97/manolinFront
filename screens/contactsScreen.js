import React from 'react';
import ContactCard from '../components/contactsComponents/contactCard';
import ContactModal from '../components/contactsComponents/contactModal';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import layoutStyle from '../styles/layoutStyle';
import fetchToAPI from '../components/fetchToAPI';

export default class ContactsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.token = this.props.navigation.getParam("token");
        this.username = this.props.navigation.getParam("name");
        this.state = {
            loaded: false,
            error: false,
            contacts: [],
            isModalVisible: false,
            modalContact: {}
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.loadContacts();
    }

    showModal(contact) {
        console.log(contact);
        this.setState({
            isModalVisible: true,
            modalContact: contact
        });
    }

    hideModal() {
        this.setState({
            isModalVisible: false,
            modalContact: {}
        });
    }

    loadContacts() {
        fetchToAPI("/central/contacts", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.token
            }
        })
        .then(response => response.json())
        .then(contacts => {
            if ( contacts.err )
                throw contacts.err;
            this.setState({
                contacts: contacts.result,
                loaded: true
            });
        })
        .catch(err => {
            this.setState({
                error: true
            });
        });
    };

    keyExtractor(item) {
        return `${item._id}`;
    }

    renderItem({item}) {
        if ( item.name === this.username ) {
            return null
        } else {
            return (
                <ContactCard
                    contact   = { item }
                    onPressFn = { this.showModal }
                    />
            )
        } 
    }

    render() {
        if ( this.state.error ) {
            return (
                <View style={styles.container}>
                    <Text>Se ha producido un error</Text>
                </View>
            );
        }

        if ( ! this.state.loaded ) {
            return (
                <View style={styles.container}>
                    <Text>Cargando...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.textLabel}>Contactos</Text>
                <FlatList
                    data         = { this.state.contacts }
                    contentContainerStyle = { styles.listContainer }
                    renderItem   = { this.renderItem   }
                    keyExtractor = { this.keyExtractor }
                    />
                <ContactModal
                    isVisible = { this.state.isModalVisible }
                    hideModal = { this.hideModal }
                    contact   = { this.state.modalContact }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#bee6ef',
        paddingTop:layoutStyle.verticalUnits10*4
    },

    textLabel: {
        fontFamily: 'montserrat-extra-bold',
        fontSize: layoutStyle.primaryFontSize,
        textAlign: "center"
    },
    
    listContainer: {
        paddingBottom: layoutStyle.verticalUnits10*4,
        paddingLeft: layoutStyle.horizontalUnits10*2,
        paddingRight: layoutStyle.horizontalUnits10*2
    }
})