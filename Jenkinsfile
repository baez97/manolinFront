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
                sh 'apt-get install git'
                sh 'npm install' 
            }
        }
    }
}