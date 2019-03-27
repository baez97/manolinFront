import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveJWT(token) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem('id_token', token)
            .then(() => {
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

    async removeJWT() {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem('id_token')
            .then( () => AsyncStorage.removeItem('username') )
            .then( () => {
                resolve();
            })
            .catch( (err) => {
                reject(err);
            });
        })
    }
};

export default deviceStorage