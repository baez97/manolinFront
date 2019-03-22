import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveJWT(token) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem('id_token', token)
            .then(() => {
                console.log("Saving the token");
                console.log(token);
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
        })
    },
    // async saveItem(key, value) {
    //     try {
    //         await AsyncStorage.setItem(key, value);
    //     } catch (error) {
    //         console.log('AsyncStorage Error: ' + error.message);
    //     }
    // },
    
    async loadJWT() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('id_token')
            .then((token) => {
                if ( token !== null ) {
                    console.log("Getting the token");
                    console.log(token);
                    resolve(token);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                reject(err);
            })
        })
    },

    async removeItems() {
        AsyncStorage.removeItem('id_token')
        .then( () => AsyncStorage.removeItem('username') )
        .then( () => {
            console.log("REMOVED!");
        })
        .catch( (err) => {
            console.log(err.message);
        });
    }
};

export default deviceStorage