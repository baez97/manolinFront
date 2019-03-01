pipeline {
    agent {
        docker {
            image 'tarampampam/node:latest' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'expo build:android --non-interactive'
            }
        }
        stage('Test') {
            steps {
                sh 'jest'
            }
        }
        stage('Delivery') {
            steps {
                sh 'npx expo login -u baez97 -p pO97informatico'
                sh 'npx expo publish --non-interactive'
            }
        }
    }
}