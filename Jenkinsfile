pipeline {
    agent any

    tools {
        nodejs 'nodejs' 
    }

    environment {
        CI = 'false'
        GH_TOKEN = credentials('github_token') 
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/30Leena/WeatherDevops.git', branch: 'main', credentialsId: 'github_token'
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
                bat 'git config --global user.email "you@example.com"' 
                bat 'git config --global user.name "30Leena"'           
                bat 'npm run deploy'
            }
        }
    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Build and deployment successful!'
        }
    }
}
