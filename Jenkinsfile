pipeline {
    agent any

    environment {
        NODE_OPTIONS = "--openssl-legacy-provider"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/30Leena/WeatherDevops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                bat 'npm run deploy'
            }
        }
    }

    post {
        failure {
            echo ' Deployment failed.'
        }
        success {
            echo ' Successfully Deployed to GitHub Pages!'
        }
    }
}


